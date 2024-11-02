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
  const clearCartButton = document.getElementById('clear-cart') as HTMLButtonElement;
  const checkoutButton = document.getElementById('checkout') as HTMLButtonElement;

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
  function filterProducts(searchTerm: string): void {
    const productContainer = document.getElementById('product-list') as HTMLElement | null;
    if (productContainer) {
      const products = productContainer.querySelectorAll('.product-item');
      products.forEach(product => {
        const productName = product.querySelector('h2')?.textContent?.toLowerCase() || '';
        if (productName.includes(searchTerm)) {
          (product as HTMLElement).style.display = 'block';
        } else {
          (product as HTMLElement).style.display = 'none';
        }
      });
    }
  }

  // Interface definitions
  interface Product {
    _id: string;
    name: string;
    price: number;
    discount: number;
    discountPrice: number;
    description: string;
    image: string;
  }

  // Array of products
  let products: Product[] = [];
  // Load products from the API
  // Load products from the API
window.addEventListener('load', async () => {
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
          <a href="Menu.html?id=${product._id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.image)}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          ${priceText}
          <img src="${product.image}" alt="${product.name}" width="200">
          <a href="#" class="btn" onclick="addToCart('${product._id}')">add to cart</a>
          </a>`;
        productContainer.appendChild(productDiv);
      });
    } else {
      console.error('Product container not found');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});


  let listCards: { [key: string]: Product & { quantity: number } | null } = {};
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
  function addToCart(id: string): void {
    if (!listCards[id]) {
      const product = products.find((product) => product._id === id);
      if (product) {
        listCards[id] = { ...product, quantity: 1 };
      }
    } else {
      listCards[id]!.quantity++;
    }
    saveCart();
    reloadCart();
  }

  // Reload cart items on index page
  function reloadCart(): void {
    const listCard = document.querySelector('.listCard') as HTMLUListElement;
    const total = document.querySelector('.total') as HTMLDivElement;
    const quantity = document.querySelector('.quantity') as HTMLSpanElement;

    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    for (const key in listCards) {
      const value = listCards[key];
      if (value) {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        listCard.innerHTML += `
        <li>
          <div><img src="${value.image}" alt="${value.name}"></div>
          <div>${value.name}</div>
          <div>${value.price.toFixed(2)}</div>
          <div>
            <button onclick="changeQuantity('${value._id}', ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity('${value._id}', ${value.quantity + 1})">+</button>
          </div>
        </li>`;
      }
    }
    total.innerText = `$${totalPrice.toFixed(2)}`;
    quantity.innerText = count.toString();
  }

  // Function to change quantity of a product in the cart
  function changeQuantity(id: string, newQuantity: number): void {
    if (listCards[id]) {
      if (newQuantity <= 0) {
        listCards[id] = null;
      } else {
        listCards[id]!.quantity = newQuantity;
      }
      saveCart();
      reloadCart(); // Reload the cart to reflect changes
    }
  }

  (window as any).addToCart = addToCart; // Make function globally accessible
  (window as any).changeQuantity = changeQuantity; // Make function globally accessible
  window.addEventListener('load', () => {
    loadCart();
    reloadCart();
  });

  function clearCart(): void {
    listCards = {};
    saveCart();
    reloadCart();
  }

  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      clearCart();
    });
  }

  // Feedback form event listener
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
});
