import axios from 'axios';
document.addEventListener('DOMContentLoaded', () => {
  // Select necessary elements
  const navbar = document.querySelector('.navbar') as HTMLElement | null;
  const searchForm = document.querySelector('.search-form') as HTMLElement | null;
  const cartItem = document.querySelector('.cart-items-container') as HTMLElement | null;
  const closeShopping = document.querySelector('.closeShopping') as HTMLElement | null;
  const userModal = document.querySelector("#user-modal") as HTMLDialogElement;
  const closeModalBtn = document.querySelector("#close-modal") as HTMLElement;
  const sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
  const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
  const container = document.querySelector(".container") as HTMLElement;
  const userbtn = document.querySelector("#user-btn") as HTMLElement;
  const loginbtn = document.querySelector(".login-btn") as HTMLElement;
  const searchinput = document.getElementById('search-box') as HTMLInputElement | null;
  const searchbutton = document.getElementById('search-btn') as HTMLElement | null;

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

  if (searchbutton) {
    searchbutton.onclick = () => {
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
  const signUpForm = document.querySelector('.sign-up-form') as HTMLFormElement | null;
if (signUpForm) {
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usernameInput = signUpForm.querySelector('input[placeholder="Username"]') as HTMLInputElement;
    const emailInput = signUpForm.querySelector('input[placeholder="Email"]') as HTMLInputElement;
    const passwordInput = signUpForm.querySelector('input[placeholder="Password"]') as HTMLInputElement;
    const phoneInput = signUpForm.querySelector('input[placeholder="Phone"]') as HTMLInputElement;

    try {
      const response = await axios.post('/api/auth/signup', {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        phone: phoneInput.value,
      });

      if (response.status === 201) {
        console.log('Sign-up successful!');
        // Redirect or update UI based on response
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      console.log('Sign-up failed. Please try again.');
    }
  });
}

// Sign-in event handler
const signInForm = document.querySelector('.sign-in-form') as HTMLFormElement | null;
if (signInForm) {
  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = signInForm.querySelector('input[placeholder="Email"]') as HTMLInputElement;
    const passwordInput = signInForm.querySelector('input[placeholder="Password"]') as HTMLInputElement;

    try {
      const response = await axios.post('/api/auth/signin', {
        email: emailInput.value,
        password: passwordInput.value,
      });

      if (response.status === 200) {
        console.log('Sign-in successful!');
        // Store authentication token if provided, and redirect or update UI
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      console.log('Sign-in failed. Please check your credentials.');
    }
  });
}

  // Search functionality
  if (searchinput && searchbutton) {
    searchinput.addEventListener('input', () => {
      const searchTerm = searchinput.value.trim().toLowerCase();
      filterProducts(searchTerm);
    });

    searchbutton.addEventListener('click', () => {
      searchinput.classList.toggle('visible');
      searchinput.focus();
    });

    searchinput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = searchinput.value.trim().toLowerCase();
        if (searchTerm) {
          window.location.href = `Menu.html?search=${encodeURIComponent(searchTerm)}`;
        }
      }
    });
  }

  // Function to filter and display products based on search input
  function filterProducts(searchTerm: string) {
    const listContainer = document.querySelector('.list') as HTMLDivElement;
    listContainer.innerHTML = ''; // Clear previous results

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );

    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('item');
      const hasDiscount = product.discountedPrice !== undefined;
      const displayPrice = hasDiscount ? product.discountedPrice!.toFixed(2) : product.price.toFixed(2);
      const originalPrice = hasDiscount ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : '';

      productDiv.innerHTML = `
        <a href="Menu.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&explain=${encodeURIComponent(product.explain)}">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="title">${product.name}</div>
        <div class="price">$${displayPrice} ${originalPrice}</div>
        <button onclick="addToCard(${product.id})">Add To Cart</button>
      `;
      listContainer.appendChild(productDiv);
    });
  }

  // Interface definitions
  interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    explain: string;
    discountedPrice?: number; // Optional property for discounted price
  }

  interface ProductCard extends Product {
    quantity: number;
  }

  // Products list
  const products: Product[] = [
    { id: 1, name: 'PRODUCT NAME 1', image: 'creatine.webp', price: 20, explain: 'This is creatine', discountedPrice: 15 },
    { id: 2, name: 'PRODUCT NAME 2', image: 'creatine2.webp', price: 20, explain: 'This is creatine', discountedPrice: 18 },
    { id: 3, name: 'PRODUCT NAME 3', image: 'creatine3.webp', price: 20, explain: 'This is creatine' },
    { id: 4, name: 'PRODUCT NAME 4', image: 'creatine4.webp', price: 20, explain: 'This is creatine', discountedPrice: 17 },
  ];

  let listCards: (ProductCard | null)[] = [];

  // Load cart from localStorage
  function loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      listCards = JSON.parse(storedCart);
    }
  }

  // Save cart to localStorage
  function saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(listCards));
  }

  // Add product to cart function
  function addToCard(key: number): void {
    const productIndex = products.findIndex((product) => product.id === key);
    if (productIndex >= 0) {
      if (!listCards[productIndex]) {
        const productCopy: ProductCard = { ...products[productIndex], quantity: 1 };
        listCards[productIndex] = productCopy;
      } else {
        listCards[productIndex]!.quantity += 1; // Increase quantity if already in the cart
      }
      saveCart();
      reloadCard();
    }
  }
  (window as any).addToCard = addToCard; // Make function globally accessible

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
        const hasDiscount = value.discountedPrice !== undefined;
        const displayPrice = hasDiscount ? value.discountedPrice! : value.price;
        totalPrice += displayPrice * value.quantity;
        count += value.quantity;
        const newDiv = document.createElement('li');
        newDiv.innerHTML = `
          <div><img src="${value.image}" alt="${value.name}"></div>
          <div>${value.name}</div>
          <div>${displayPrice.toLocaleString()}$</div>
          <div>
            <button onclick="changeQuantity(${value.id}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${value.id}, ${value.quantity + 1})">+</button>
          </div>`;
        listCard.appendChild(newDiv);
      }
    });

    total.innerText = totalPrice.toLocaleString() + "$";
    quantity.innerText = count.toString();
  }

  // Function to change quantity of a product in the cart
  function changeQuantity(id: number, newQuantity: number): void {
    const productIndex = listCards.findIndex((product) => product?.id === id);
    if (productIndex >= 0 && listCards[productIndex]) {
      if (newQuantity <= 0) {
        listCards[productIndex] = null; // Remove the product if quantity is zero or less
      } else {
        listCards[productIndex]!.quantity = newQuantity; // Update the quantity
      }
      saveCart();
      reloadCard(); // Reload the cart to reflect changes
    }
  }
  (window as any).changeQuantity = changeQuantity; // Make function globally accessible

  // Function to get URL parameters
  function getProductDetailsFromURL(): Product | null {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id') || '');
    const name = decodeURIComponent(urlParams.get('name') || '');
    const price = parseFloat(urlParams.get('price') || '0');
    const image = decodeURIComponent(urlParams.get('image') || '');
    const explain = decodeURIComponent(urlParams.get('explain') || '');

    if (!id || !name || !price || !image || !explain) return null;

    return { id, name, price, image, explain } as Product;
  }

  // Setup Menu Page
  function setupMenuPage(): void {
    const product = getProductDetailsFromURL();
    if (!product) {
      console.error("Invalid product details in URL");
      return;
    }

    const listContainer = document.querySelector('.listcart') as HTMLDivElement;
    if (listContainer) {
      const hasDiscount = product.discountedPrice !== undefined;
      const displayPrice = hasDiscount ? product.discountedPrice!.toFixed(2) : product.price.toFixed(2);
      const priceHTML = hasDiscount
        ? `<p class="price"><span class="discounted-price">$${displayPrice}</span> <span class="original-price">$${product.price.toFixed(2)}</span></p>`
        : `<p class="price">$${displayPrice}</p>`;

      listContainer.innerHTML = `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.name}">
          <div class="info">
            <h1>${product.name}</h1>
            <p class="explain">${product.explain}</p>
            ${priceHTML}
            <button id="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      `;

      const addToCartButton = document.getElementById('add-to-cart-btn') as HTMLButtonElement;
      if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
          addToCard(product.id);
          alert('Product added to cart!');
        });
      }
    }

    // Display other products at the bottom
    const otherProductsContainer = document.querySelector('.other-products') as HTMLDivElement;
    if (otherProductsContainer) {
      const otherProducts = products.filter(p => p.id !== product.id);
      otherProductsContainer.innerHTML = otherProducts.map(generateProductHTML).join('');
    }
  }

  // Initialize app on index page
  function initApp(): void {
    const list = document.querySelector('.list') as HTMLDivElement;
    products.forEach((product) => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('item');
      const hasDiscount = product.discountedPrice !== undefined;
      const displayPrice = hasDiscount ? product.discountedPrice!.toFixed(2) : product.price.toFixed(2);
      const originalPrice = hasDiscount ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : '';

      newDiv.innerHTML = `
        <a href="Menu.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&explain=${encodeURIComponent(product.explain)}">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <div class="title">${product.name}</div>
        <div class="price">$${displayPrice} ${originalPrice}</div>
        <button onclick="addToCard(${product.id})">Add To Cart</button>`;
      list.appendChild(newDiv);
    });

    // Add search functionality to navigate to Menu.html with search term
    if (searchinput) {
      searchinput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' ) {
          const searchTerm = searchinput.value.trim().toLowerCase()
          if (searchTerm) {
            window.location.href = `Menu.html?search=${encodeURIComponent(searchTerm)}`;
          }
        }
      });
    }
  }

  // Function to populate the menu with products
  function populateMenu(products: Product[]): void {
    const container = document.querySelector('.box-container');
    if (container) {
      const normalPriceProducts = products.filter(product => product.discountedPrice === undefined);
      container.innerHTML = normalPriceProducts.map(generateProductHTML).join('');
    }
  }

  // Function to populate the discounted menu with products
  function populateDiscountedMenu(products: Product[]): void {
    const container = document.querySelector('.box-container');
    if (container) {
      const discountedProducts = products.filter(product => product.discountedPrice !== undefined);
      container.innerHTML = discountedProducts.map(generateProductHTML).join('');
    }
  }

  // Call the appropriate function to populate the menu on page load
  if (window.location.pathname.includes('Menu.html')) {
    setupMenuPage();
    populateDiscountedMenu(products);
  } else {
    initApp();
    populateMenu(products);
  }

  // Always reload the cart on page load
  loadCart();
  reloadCard();
  filterProducts(''); // Display all products initially

  // Function to generate HTML for a product
  function generateProductHTML(product: Product): string {
    const hasDiscount = product.discountedPrice !== undefined;
    const displayPrice = hasDiscount ? product.discountedPrice!.toFixed(2) : product.price.toFixed(2);
    const originalPrice = hasDiscount ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : '';

    return `
      <div class="box">
        <a href="Menu.html?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}&explain=${encodeURIComponent(product.explain)}">
          <img src="${product.image}" alt="${product.name}">
        </a>
        <h3>${product.name}</h3>
        <div class="price">$${displayPrice} ${originalPrice}</div>
        <a href="#" class="btn" onclick="addToCard(${product.id})">add to cart</a>
      </div>
    `;
  }

  const feedbackForm = document.getElementById('feedback-form') as HTMLFormElement | null;

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('name') as HTMLInputElement;
      const feedbackInput = document.getElementById('feedback') as HTMLTextAreaElement;
      const emailInput = document.getElementById('email') as HTMLInputElement; // Add email input

      if (nameInput && feedbackInput && emailInput) {
        const feedbackData = {
          name: nameInput.value,
          email: emailInput.value,
          message: feedbackInput.value,
        };

        try {
          const response = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData),
          });

          if (response.ok) {
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
          } else {
            alert('Failed to submit feedback');
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
          alert('An error occurred while submitting feedback');
        }
      }
    });
  }
  interface product {
  _id: string; // Assuming MongoDB ObjectId will be returned as a string
  name: string;
  price: number;
  description: string;
  image: string;
}

window.addEventListener('load', async () => {
  try {
    console.log("Attempting to fetch products...");

    // Fetch products from the API
    const response = await fetch('http://localhost:3000/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const products: product[] = await response.json();
    console.log('Fetched products:', products); // Log to verify data

    // Get the container to display products
    const productContainer = document.getElementById('product-list') as HTMLElement | null;
    console.log('Product container:', productContainer); // Log to verify container

    if (productContainer) {
      productContainer.innerHTML = ''; // Clear anys previous content

      products.forEach((product: product) => {
        console.log('Appending product:', product); // Add debug log

        // Create a div element for each product
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <img src="${product.image}" alt="${product.name}" width="200">
          <button id="add-to-cart-btn">Add to Cart</button>
        `;

        // Append the new product div to the container
        productContainer.appendChild(productDiv);
      });
    } else {
      console.error('Product container not found');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
});
