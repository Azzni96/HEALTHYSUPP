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

// Define the products and cart structures
let products: Product[] = [];
let listCards: { [key: string]: Product & { quantity: number } | null } = {};

// Load products from the API and display them on the page
export async function loadProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    products = await response.json();
    products = products.map((product: any) => ({
      ...product,
      discountPrice: product.discount > 0
        ? (product.price || 0) - ((product.price || 0) * ((product.discount || 0) / 100))
        : product.price || 0,
    }));

    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Display products on the page
function displayProducts(products: Product[]) {
  const productContainer = document.getElementById('product-list') as HTMLElement | null;
  if (productContainer) {
    productContainer.innerHTML = '';
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
        <img src="${product.image}" alt="${product.name}" width="200">
        <a href="#" class="btn" onclick="addToCart('${product.id}')">Add to Cart</a>
        <a href="Menu.html?id=${product.id}" class="btn">View Product</a>`;
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
    listCards = JSON.parse(storedCart);
  }
  reloadCart(); // Reload cart display on page load
}

// Save cart to localStorage
function saveCart(): void {
  localStorage.setItem('cart', JSON.stringify(listCards));
}

// Add product to cart
export function addToCart(id: string): void {
  if (!listCards[id]) {
    const product = products.find((product) => product.id === id);
    if (product) {
      listCards[id] = { ...product, quantity: 1 };
    }
  } else {
    listCards[id]!.quantity!++;
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
        totalPrice += value.price * value.quantity!;
        count += value.quantity!;
        listCard.innerHTML += `
          <li>
            <div><img src="${value.image}" alt="${value.name}" width="50"></div>
            <div>${value.name}</div>
            <div>$${value.price.toFixed(2)}</div>
            <div>
              <button onclick="changeQuantity('${value.id}', ${value.quantity! - 1})">-</button>
              <div class="count">${value.quantity}</div>
              <button onclick="changeQuantity('${value.id}', ${value.quantity! + 1})">+</button>
            </div>
          </li>`;
      }
    }
    total.innerText = `$${totalPrice.toFixed(2)}`;
    quantity.innerText = count.toString();
  } else {
    console.error('Cart elements not found');
  }
}

// Change quantity of a product in the cart
export function changeQuantity(id: string, newQuantity: number): void {
  if (listCards[id]) {
    if (newQuantity <= 0) {
      listCards[id] = null;
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
}

// Attach cart functions to the window object for accessibility in HTML
(window as any).addToCart = addToCart;
(window as any).changeQuantity = changeQuantity;
(window as any).clearCart = clearCart;

// Load cart data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  loadProducts();
});
