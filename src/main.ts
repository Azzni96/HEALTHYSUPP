// Valitaan elementit ja määritellään toiminnot TypeScriptissä
let navbar: HTMLElement | null = document.querySelector('.navbar');
let searchForm: HTMLElement | null = document.querySelector('.search-form');
let cartItem: HTMLElement | null = document.querySelector('.cart-items-container');
const sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
const container = document.querySelector(".container") as HTMLElement;
let contact = document.querySelector(".contact") as HTMLElement;
let about = document.querySelector(".about") as HTMLElement;
let menu = document.querySelector(".menu") as HTMLElement;
let home = document.querySelector(".home") as HTMLElement;
let userbtn = document.querySelector("#user-btn") as HTMLElement;
let UserSign = document.querySelector("#User") as HTMLElement;
let header = document.querySelector(".header") as HTMLElement;

// Menu painikkeen toiminta
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

(document.querySelector("#user-btn") as HTMLElement).onclick = () => {
    contact?.classList.add('hidden')
    about?.classList.add('hidden')
    menu?.classList.add('hidden')
    home?.classList.add('hidden')
    header?.classList.remove('hidden')
    UserSign?.classList.remove('hidden')
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
