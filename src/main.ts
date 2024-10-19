let navbar: HTMLElement | null = document.querySelector('.navbar');

(document.querySelector('#menu-btn') as HTMLElement).onclick = () => {
    navbar?.classList.toggle('active');
    cartItem?.classList.remove('active');
    searchForm?.classList.remove('active');
}

let searchForm: HTMLElement | null = document.querySelector('.search-form');

(document.querySelector('#search-btn') as HTMLElement).onclick = () => {
    searchForm?.classList.toggle('active');
    navbar?.classList.remove('active');
    cartItem?.classList.remove('active');
}

let cartItem: HTMLElement | null = document.querySelector('.cart-items-container');

(document.querySelector('#cart-btn') as HTMLElement).onclick = () => {
    cartItem?.classList.toggle('active');
    navbar?.classList.remove('active');
    searchForm?.classList.remove('active');
}

window.onscroll = ()=>{
    navbar?.classList.remove('active');
    cartItem?.classList.remove('active');
    searchForm?.classList.remove('active');
}
