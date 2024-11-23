import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  discountPrice: number;
  description: string;
  image: string;
  quantity?: number;
}

let products: Product[] = [];
let listCards: { [key: string]: Product & { quantity: number } | null } = {};

// Load products from API and display on the page, optionally filtered by category
export async function loadProducts(category: string | null = null) {
  try {
    const url = category
      ? `http://localhost:3000/api/products/category/${category}`
      : `http://localhost:3000/api/products`;

    console.log(`Fetching products from: ${url}`); // Debugging log for URL

    const response = await axios.get(url);
    products = response.data.map((product: any) => ({
      ...product,
      discountPrice: product.discount > 0
        ? (product.price || 0) - ((product.price || 0) * ((product.discount || 0) / 100))
        : product.price || 0,
    }));

    displayProducts(products); // Display the filtered products
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display products in the product list (Menu.html or filtered category)
function displayProducts(products: Product[]) {
  const productContainer = document.getElementById('product-list') as HTMLElement | null;
  if (productContainer) {
    productContainer.innerHTML = ''; // Clear existing products
    if (products.length === 0) {
      productContainer.innerHTML = '<p>No products found for this category.</p>';
      return;
    }

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');

      const priceText = product.discount > 0
        ? `<p><del>$${product.price.toFixed(2)}</del> $${product.discountPrice.toFixed(2)}</p>`
        : `<p>Price: $${product.price.toFixed(2)}</p>`;

      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        ${priceText}
        <img src="http://localhost:3000/uploads/${product.image}" alt="${product.name}" width="200">
        <button class="btn add-to-cart">Add to Cart</button>
      `;

      const addToCartButton = productDiv.querySelector('.add-to-cart');
      addToCartButton?.addEventListener('click', () => addToCart(product.id));

      productContainer.appendChild(productDiv);
    });
  } else {
    console.error('Product container not found');
  }
}

// Load cart from localStorage
export function loadCart(): void {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    const cartArray = JSON.parse(storedCart); // Parse JSON string into an array
    listCards = {}; // Reset the `listCards` object
    cartArray.forEach((item: Product & { quantity: number }) => {
      listCards[item.id] = item; // Rebuild the `listCards` object
    });
  }
  reloadCart();
}

// Save cart as a list, not an object
function saveCart(): void {
  const cartArray = Object.values(listCards).filter(Boolean); // Convert object values to an array
  localStorage.setItem('cart', JSON.stringify(cartArray));
}

// Add product to cart
export function addToCart(id: string): void {
  const product = products.find((product) => product.id === id);
  if (product) {
    const discountPrice = product.discount > 0 ? product.discountPrice : product.price;

    if (!listCards[id]) {
      listCards[id] = { ...product, quantity: 1, price: discountPrice };
    } else {
      listCards[id]!.quantity!++;
    }
  }
  saveCart();
  reloadCart();
}

// Reload cart items on the page
export function reloadCart(): void {
  const listCard = document.querySelector('.listCard') as HTMLUListElement;
  const total = document.querySelector('.total') as HTMLDivElement;
  const quantity = document.querySelector('.quantity') as HTMLSpanElement;

  if (listCard && total && quantity) {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    for (const key in listCards) {
      const value = listCards[key];
      if (value) {
        const productPrice = value.price;
        totalPrice += productPrice * value.quantity!;
        count += value.quantity!;
        listCard.innerHTML += `
          <li>
            <div><img src="http://localhost:3000/uploads/${value.image}" alt="${value.name}" width="50"></div>
            <div>${value.name}</div>
            <div>${value.quantity} pcs</div>
            <div>
              <button onclick="changeQuantity('${value.id}', ${value.quantity! - 1})">-</button>
              <div class="count">${value.quantity}</div>
              <button onclick="changeQuantity('${value.id}', ${value.quantity! + 1})">+</button>
            </div>
          </li>`;
      }
    }
    total.innerText = `Total: $${totalPrice.toFixed(2)}`;
    quantity.innerText = count.toString();
  } else {
    console.error('Cart elements not found');
  }
}

// Change quantity of a product in the cart
export function changeQuantity(id: string, newQuantity: number): void {
  if (listCards[id]) {
    if (newQuantity <= 0) {
      delete listCards[id];
    } else {
      listCards[id]!.quantity = newQuantity;
    }
    saveCart();
    reloadCart();
  }
}

// Clear all items from the cart
export function clearCart(): void {
  listCards = {};
  saveCart();
  reloadCart();
  console.log('Cart has been cleared.');
}

// Attach functions to the window object for accessibility in HTML
(window as any).clearCart = clearCart;
(window as any).changeQuantity = changeQuantity;
(window as any).addToCart = addToCart;

// Load products and cart data on page load
window.addEventListener('load', () => {
  loadCart();

  // Retrieve the category from the URL to load specific products
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  loadProducts(category);
});
