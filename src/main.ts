// Valitaan elementit
let navbar: HTMLElement | null = document.querySelector('.navbar');
let searchForm: HTMLElement | null = document.querySelector('.search-form');
let cartItem: HTMLElement | null = document.querySelector('.cart-items-container');
let closeShopping: HTMLElement | null = document.querySelector('.closeShopping')
let userModal = document.querySelector("#user-modal") as HTMLDialogElement;
let closeModalBtn = document.querySelector("#close-modal") as HTMLElement;
const sign_in_btn = document.querySelector("#sign-in-btn") as HTMLElement;
const sign_up_btn = document.querySelector("#sign-up-btn") as HTMLElement;
const container = document.querySelector(".container") as HTMLElement;
let userbtn = document.querySelector("#user-btn") as HTMLElement;
let loginbtn = document.querySelector(".login-btn") as HTMLElement;
const cartContainer = document.querySelector('.cart-items-container') as HTMLElement;
// Menu-painikkeen toiminta
(document.querySelector('#menu-btn') as HTMLElement).onclick = () => {
    navbar?.classList.toggle('active');
    cartItem?.classList.remove('active');
    searchForm?.classList.remove('active');
};
/*Close Cart-painikeen toiminta*/
(document.querySelector('.closeShopping') as HTMLElement).onclick = () => {
    cartItem?.classList.remove('active');
}

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
const list = document.querySelector('.list') as HTMLDivElement;
const listCard = document.querySelector('.listCard') as HTMLUListElement;
const total = document.querySelector('.total') as HTMLSpanElement;
const quantity = document.querySelector('.quantity') as HTMLSpanElement;

interface Product{
    id: number;
    name:string;
    image: string;
    price: number;
}

interface ProductCard extends Product {
    quantity: number;
}
let products: Product[] = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'creatine.webp',
        price: 20
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: 'creatine2.webp',
        price: 20
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: 'creatine3.webp',
        price: 20
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: 'creatine4.webp',
        price: 20
    },
];

let listCards: (ProductCard | null)[] = [];

function initApp(): void {
    products.forEach((value, key) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('item')
        newDiv.innerHTML= `
            <img src="${value.image}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}$</div>
            <button onclick="addToCard(${key})">Add To Card</button>`
        list.appendChild(newDiv)
    });
}
initApp();

// Add product to card
function addToCard(key: number): void {
    if (!listCards[key]) {
        const productCopy: ProductCard = { ...products[key], quantity: 1 };
        listCards[key] = productCopy;
    }
    reloadCard();
}
// Make function globally accessible
(window as any).addToCard = addToCard;

// Change product quantity
function changeQuantity(key: number, quantity: number): void {
    if (quantity === 0) {
        listCards[key] = null;
    } else {
        const currentProduct = listCards[key];
        if (currentProduct) {
            currentProduct.quantity = quantity;
            currentProduct.price = quantity * products[key].price;
        }
    }
    reloadCard();
}
// Make function globally accessible
(window as any).changeQuantity = changeQuantity;

function reloadCard(): void{
    listCard.innerHTML= ''
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) =>{
        if(value){
            totalPrice += value.price;
            count += value.quantity
            const newDiv = document.createElement('li')
            newDiv.innerHTML =`
                <div><img src="${value.image}" alt"${value.name}"></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}$</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button
                </div>`
                listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString() + "$";
    quantity.innerText =count.toString();
}

















/*const addToCartButtons = document.querySelectorAll('.box .btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the relevant box element
        const itemBox = button.parentElement as HTMLElement;

        // Extract item information
        const itemImageSrc = (itemBox.querySelector('img') as HTMLImageElement).src;
        const itemName = (itemBox.querySelector('h3') as HTMLElement).textContent;
        const itemPrice = (itemBox.querySelector('.price') as HTMLElement).firstChild?.textContent;

        // Create a new cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <span class="fas fa-times"></span>
            <img src="${itemImageSrc}" alt="${itemName}">
            <div class="content">
                <h3>${itemName}</h3>
                <div class="price">${itemPrice}</div>
            </div>
        `;

        // Add the new cart item to the container
        cartContainer?.appendChild(cartItem);

        // Add functionality to remove items from the cart
        cartItem.querySelector('.fa-times')?.addEventListener('click', () => {
            cartItem.remove();
        });
    });
});*/
