export function setupNavListeners() {
    const navbar = document.querySelector('.navbar') as HTMLElement | null;
    const searchForm = document.querySelector('.search-form') as HTMLElement | null;
    const cartItem = document.querySelector('.cart-items-container') as HTMLElement | null;
    const userModal = document.querySelector("#user-modal") as HTMLDialogElement | null;
    const closeModalBtn = document.querySelector("#close-modal") as HTMLElement | null;
    const userbtn = document.querySelector("#user-btn") as HTMLElement | null;
    const loginbtn = document.querySelector(".login-btn") as HTMLElement | null;
    const searchButton = document.getElementById('search-btn') as HTMLElement | null;
    const searchInput = document.getElementById('search-box') as HTMLInputElement | null;

    // Toggle navbar visibility
    if (navbar && document.querySelector('#menu-btn')) {
      (document.querySelector('#menu-btn') as HTMLElement).onclick = () => {
        navbar.classList.toggle('active');
        cartItem?.classList.remove('active');
        searchForm?.classList.remove('active');

        const logoutBtn = document.querySelector('#logoutbtn') as HTMLElement | null;
        if (logoutBtn) {
          logoutBtn.classList.toggle('active');
        }
      };
    }

    // Toggle cart item display
    if (document.querySelector('#cart-btn')) {
      (document.querySelector('#cart-btn') as HTMLElement).onclick = () => {
        cartItem?.classList.toggle('active');
        navbar?.classList.remove('active');
        searchForm?.classList.remove('active');
      };
    }

    // Toggle search form display
    if (searchButton) {
      searchButton.onclick = () => {
        searchForm?.classList.toggle('active');
        navbar?.classList.remove('active');
        cartItem?.classList.remove('active');
      };
    }

    // Open and close user modal
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

    // Close navbar, cart, and search on scroll
    window.onscroll = () => {
      navbar?.classList.remove('active');
      cartItem?.classList.remove('active');
      searchForm?.classList.remove('active');
    };

    // Search input functionality
    if (searchInput) {
      searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          const searchTerm = searchInput.value.trim().toLowerCase();
          if (searchTerm) {
            window.location.href = `Menu.html?search=${encodeURIComponent(searchTerm)}`;
          }
        }
      });
    }
  }
