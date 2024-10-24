// Ensure code runs after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select necessary elements
    let navbar: HTMLElement | null = document.querySelector('.navbar');
    let searchForm: HTMLElement | null = document.querySelector('.search-form');
    let cartItem: HTMLElement | null = document.querySelector('.cart-items-container');
    let closeShopping: HTMLElement | null = document.querySelector('.closeShopping');
    let userModal = document.querySelector("#user-modal") as HTMLDialogElement;
    let closeModalBtn = document.querySelector("#close-modal") as HTMLElement;
    const sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
    const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
    const container = document.querySelector(".container") as HTMLElement;
    let userbtn = document.querySelector("#user-btn") as HTMLElement;
    let loginbtn = document.querySelector(".login-btn") as HTMLElement;

    // Verify that the element exists before setting event listeners
    if (navbar && document.querySelector('#menu-btn')) {
      (document.querySelector('#menu-btn') as HTMLElement).onclick = () => {
        navbar.classList.toggle('active');
        cartItem?.classList.remove('active');
        searchForm?.classList.remove('active');
      };
    }

    if (closeShopping) {
      closeShopping.onclick = () => {
        cartItem?.classList.remove('active');
      };
    }

    if (document.querySelector('#search-btn')) {
      (document.querySelector('#search-btn') as HTMLElement).onclick = () => {
        searchForm?.classList.toggle('active');
        navbar?.classList.remove('active');
        cartItem?.classList.remove('active');
      };
    }

    if (document.querySelector('#cart-btn')) {
      (document.querySelector('#cart-btn') as HTMLElement).onclick = () => {
        cartItem?.classList.toggle('active');
        navbar?.classList.remove('active');
        searchForm?.classList.remove('active');
      };
    }

    if (userbtn) {
      userbtn.onclick = () => {
        userModal?.showModal();
      };
    }

    if (closeModalBtn) {
      closeModalBtn.onclick = () => {
        userModal?.close();
      };
    }

    if (loginbtn) {
      loginbtn.onclick = () => {
        userModal?.showModal();
      };
    }

    window.onscroll = () => {
      navbar?.classList.remove('active');
      cartItem?.classList.remove('active');
      searchForm?.classList.remove('active');
    };

    if (sign_up_btn) {
      sign_up_btn.addEventListener("click", () => {
        container?.classList.add("sign-up-mode");
      });
    }

    if (sign_in_btn) {
      sign_in_btn.addEventListener("click", () => {
        container?.classList.remove("sign-up-mode");
      });
    }
  });


// Interface definitions
interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    explain: string;
}

interface ProductCard extends Product {
    quantity: number;
}

// Products list
let products: Product[] = [
    { id: 1, name: 'PRODUCT NAME 1', image: 'creatine.webp', price: 20, explain: 'This is creatine' },
    { id: 2, name: 'PRODUCT NAME 2', image: 'creatine2.webp', price: 20, explain: 'This is creatine' },
    { id: 3, name: 'PRODUCT NAME 3', image: 'creatine3.webp', price: 20, explain: 'This is creatine' },
    { id: 4, name: 'PRODUCT NAME 4', image: 'creatine4.webp', price: 20, explain: 'This is creatine' },
];

let listCards: (ProductCard | null)[] = [];

// Initialize product list for the index page
function initApp(): void {
    const list = document.querySelector('.list') as HTMLDivElement;
    products.forEach((value, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <a href="Menu.html?id=${value.id}&name=${encodeURIComponent(value.name)}&price=${value.price}&image=${encodeURIComponent(value.image)}">
                <img src="${value.image}" alt="${value.name}">
            </a>
            <div class="title">
                <a href="Menu.html?id=${value.id}&name=${encodeURIComponent(value.name)}&price=${value.price}&image=${encodeURIComponent(value.image)}">${value.name}</a>
            </div>
            <div class="price">${value.price.toLocaleString()}$</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}

// Add product to cart
function addToCard(key: number): void {
    if (!listCards[key]) {
        const productCopy: ProductCard = { ...products[key], quantity: 1 };
        listCards[key] = productCopy;
    } else {
        listCards[key]!.quantity += 1; // Increase quantity if already in the cart
    }
    reloadCard();
}
(window as any).addToCard = addToCard; // Make function globally accessible

// Change product quantity
function changeQuantity(key: number, quantity: number): void {
    if (quantity === 0) {
        listCards[key] = null;
    } else {
        const currentProduct = listCards[key];
        if (currentProduct) {
            currentProduct.quantity = quantity;
        }
    }
    reloadCard();
}
(window as any).changeQuantity = changeQuantity; // Make function globally accessible

// Reload cart items on index page
function reloadCard(): void {
    const listCard = document.querySelector('.listCard') as HTMLUListElement;
    const total = document.querySelector('.total') as HTMLDivElement;
    const quantity = document.querySelector('.quantity') as HTMLSpanElement;

    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            const newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}" alt="${value.name}"></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}$</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString() + "$";
    quantity.innerText = count.toString();
}


// Utility function to read URL parameters
function getProductDetailsFromURL(): Product | null {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id') || '');
    const name = decodeURIComponent(urlParams.get('name') || '');
    const price = parseFloat(urlParams.get('price') || '0');
    const image = decodeURIComponent(urlParams.get('image') || '');
    const explain = decodeURIComponent(urlParams.get('explain') || '');

    // Return null if mandatory details are missing
    if (!id || !name || !price || !image && !explain ) return null;

    return { id, name, price, image, explain } as Product;
}

// Function to initialize the product details page
function setupMenuPage(): void {
    const product = getProductDetailsFromURL();
    if (!product) {
        console.error("Invalid product details in URL");
        return;
    }

    // Set product details on the page
    const listContainer = document.querySelector('.listcart') as HTMLDivElement;
    listContainer.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button id="add-to-cart-btn">Add to Cart</button>
        </div>
    `;
    const listCart = document.querySelector('.listcart') as HTMLDivElement;
    listCart.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}">
         <div class="product">
            <h1>${product.name}</h1>
            <p class="explain">${product.explain}<p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button id="add-to-cart-btn">Add to Cart</button>
        </div>
        </div>
    `;

    // Handle adding the product to the cart
    const addToCartButton = document.getElementById('add-to-cart-btn') as HTMLButtonElement;
    addToCartButton.addEventListener('click', () => {
        // Retrieve the cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart') || '[]') as ProductCard[];

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex((item: ProductCard) => item.id === product.id);

        if (existingProductIndex !== -1) {
            // If the product is already in the cart, increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product to the cart
            cart.push({ ...product, quantity: 1 });
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the in-memory listCards array to reflect the new cart state
        listCards = cart;

        // Reload the cart to update the UI
        reloadCard();

        alert('Product added to cart!');
    });

}

// Reload cart and set up the menu page when the script runs
initApp(); // Initialize index page product list
setupMenuPage(); // Setup product details on Menu.html
reloadCard(); // Sync cart state
