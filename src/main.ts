// Valitaan elementit
let navbar: HTMLElement | null = document.querySelector('.navbar');
let searchForm: HTMLElement | null = document.querySelector('.search-form');
let cartItem: HTMLElement | null = document.querySelector('.cart-items-container');
let userModal = document.querySelector("#user-modal") as HTMLDialogElement;
let closeModalBtn = document.querySelector("#close-modal") as HTMLElement;
const sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
const container = document.querySelector(".container") as HTMLElement;
let userbtn = document.querySelector("#user-btn") as HTMLElement;
let loginbtn = document.querySelector(".login-btn") as HTMLElement;

// Menu-painikkeen toiminta
(document.querySelector('#menu-btn') as HTMLElement).onclick = () => {
    navbar?.classList.toggle('active');
    cartItem?.classList.remove('active');
    searchForm?.classList.remove('active');
};

// Search-painikkeen toiminta
(document.querySelector('#search-btn') as HTMLElement).onclick = () => {
    searchForm?.classList.toggle('active');
    navbar?.classList.remove('active');
    cartItem?.classList.remove('active');
};

// Cart-painikkeen toiminta
(document.querySelector('#cart-btn') as HTMLElement).onclick = () => {
    cartItem?.classList.toggle('active');
    navbar?.classList.remove('active');
    searchForm?.classList.remove('active');
};
// User button click to show the modal
userbtn.onclick = () => {
    userModal?.showModal(); // Open the dialog
};

// Close modal button action
closeModalBtn.onclick = () => {
    userModal?.close(); // Close the dialog
};
loginbtn.onclick = () => {
    userModal?.showModal();
}
// Kun vieritetään sivua, kaikki valikot sulkeutuvat
window.onscroll = () => {
    navbar?.classList.remove('active');
    cartItem?.classList.remove('active');
    searchForm?.classList.remove('active');
};

// Kirjautuminen ja rekisteröityminen -moodin vaihto
sign_up_btn?.addEventListener("click", () => {
    container?.classList.add("sign-up-mode");
});

sign_in_btn?.addEventListener("click", () => {
    container?.classList.remove("sign-up-mode");
});
