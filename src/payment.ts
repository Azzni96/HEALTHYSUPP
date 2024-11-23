export function processPayment(): void {
    const paymentForm = document.getElementById('payment-form') as HTMLFormElement | null;

    if (!paymentForm) {
      console.error('Payment form not found on the page.');
      return;
    }

    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Haetaan lomakkeen arvot
      const cardName = (document.getElementById('card-name') as HTMLInputElement)?.value.trim();

      // Tarkistetaan, että kaikki kentät on täytetty
      if (!cardName) {
        alert('Täytä kaikki maksutiedot.');
        return;
      }

      // Simuloidaan maksun onnistuminen
      const isPaymentSuccessful = Math.random() > 0.2;

      if (isPaymentSuccessful) {
        alert('Maksu hyväksytty!');
        alert(localStorage.getItem('cart'));
        paymentForm.reset(); // Tyhjennetään lomake

        displayReceipt(cardName); // Näytetään kuitti
        localStorage.removeItem('cart'); // Tyhjennetään ostoskori
          // Redirect after 5 seconds
          setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000); // Adjust the delay as needed


      } else {
        alert('Maksu epäonnistui. Yritä uudelleen.');
      }
    });
  }

  /**
   * Näytetään kuitti maksun hyväksynnän jälkeen
   */
  export function displayReceipt(cardName: string): void {
    const receiptContainer = document.getElementById('receipt-container')!;
    const customerNameElement = document.getElementById('customer-name')!;
    const paymentDateElement = document.getElementById('payment-date')!;
    const productListElement = document.getElementById('product-list')!;
    const totalAmountElement = document.getElementById('total-amount')!;

    // Haetaan ostoskorin tiedot
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!Array.isArray(cartData)) {
        console.error('Cart data is not an array. Resetting cart.');
        localStorage.removeItem('cart');
        return;
      }

    if (cartData.length === 0) {
      alert('Ostoskorisi on tyhjä.');
      return;
    }

    const paymentDate = new Date().toLocaleString();

    // Täytetään kuitin tiedot
    customerNameElement.textContent = `Kortinhaltija: ${cardName}`;
    paymentDateElement.textContent = `Päivämäärä: ${paymentDate}`;

    productListElement.innerHTML = '';
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

    const printButton = document.getElementById('print-receipt-btn')!;
    printButton.style.display = 'block';
    printButton.onclick = () => window.print();
  }

  document.addEventListener('DOMContentLoaded', () => {
    processPayment();
  });
