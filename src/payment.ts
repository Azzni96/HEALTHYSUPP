export function processPayment(): void {
    const paymentForm = document.getElementById('payment-form') as HTMLFormElement | null;

    if (!paymentForm) {
        console.error('Payment form not found on the page.');
        return;
    }

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Haetaan lomakkeen arvot
        const cardNumber = (document.getElementById('card-number') as HTMLInputElement)?.value.trim();
        const cardName = (document.getElementById('card-name') as HTMLInputElement)?.value.trim();
        const cardExpiration = (document.getElementById('card-expiration') as HTMLInputElement)?.value.trim();
        const cardCVV = (document.getElementById('card-cvv') as HTMLInputElement)?.value.trim();
        const cardPostalCode = (document.getElementById('card-postal-code') as HTMLInputElement)?.value.trim();

        // Tarkistetaan, että kaikki kentät on täytetty
        if (!cardNumber || !cardName || !cardExpiration || !cardCVV || !cardPostalCode) {
            alert('Täytä kaikki maksutiedot.');
            return;
        }

        // Simuloidaan maksun onnistuminen
        const isPaymentSuccessful = Math.random() > 0.2;

        if (isPaymentSuccessful) {
            alert('Maksu hyväksytty!');
            paymentForm.reset(); // Tyhjennetään lomake
            localStorage.removeItem('cart'); // Tyhjennetään ostoskori

            // Näytetään kuitti
            displayReceipt(cardName);

            // Uudelleenohjaus index.html-sivulle
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 5000); // Odota 5 sekuntia ennen uudelleenohjausta
        } else {
            alert('Maksu epäonnistui. Yritä uudelleen.');
        }
    });
}

/**
 * Näytetään kuitti maksun hyväksynnän jälkeen
 */
function displayReceipt(cardName: string): void {
    const receiptContainer = document.getElementById('receipt-container');
    const customerNameElement = document.getElementById('customer-name');
    const paymentDateElement = document.getElementById('payment-date');
    const productListElement = document.getElementById('product-list');
    const totalAmountElement = document.getElementById('total-amount');

    if (!receiptContainer || !customerNameElement || !paymentDateElement || !productListElement || !totalAmountElement) {
        console.error('Receipt elements not found.');
        return;
    }

    // Haetaan ostoskorin tiedot
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const paymentDate = new Date().toLocaleString();

    // Täytetään kuitin tiedot
    customerNameElement.textContent = `Kortinhaltija: ${cardName}`;
    paymentDateElement.textContent = `Päivämäärä: ${paymentDate}`;

    productListElement.innerHTML = ''; // Tyhjennetään vanhat tiedot
    let total = 0;
    cartData.forEach((item: { name: string; quantity: number; price: number }) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.quantity} kpl - €${item.price.toFixed(2)}`;
        productListElement.appendChild(listItem);
        total += item.quantity * item.price;
    });

    totalAmountElement.textContent = `Kokonaissumma: €${total.toFixed(2)}`;

    // Näytetään kuitti ja tulostuspainike
    receiptContainer.style.display = 'block';

    const printButton = document.getElementById('print-receipt-btn');
    if (printButton) {
        printButton.style.display = 'block';
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    processPayment();
});
