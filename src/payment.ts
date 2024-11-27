export function processPayment(): void {
  const step1 = document.getElementById('step-1')!;
  const step2 = document.getElementById('step-2')!;
  const nextStepButton = document.getElementById('next-step')!;
  const paymentForm = document.getElementById('payment-form') as HTMLFormElement | null;

  // Step 1: Billing Details
  nextStepButton.addEventListener('click', () => {
    const cardName = (document.getElementById('card-name') as HTMLInputElement)?.value.trim();
    const address = (document.getElementById('address') as HTMLInputElement)?.value.trim();
    const city = (document.getElementById('city') as HTMLInputElement)?.value.trim();
    const state = (document.getElementById('state') as HTMLInputElement)?.value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement)?.value.trim();
    const email = (document.getElementById('email') as HTMLInputElement)?.value.trim();

    if (!cardName || !address || !city || !state || !phone || !email) {
      alert('Please fill in all required fields.');
      return;
    }

    // Save billing details to local storage
    localStorage.setItem('billingDetails', JSON.stringify({ cardName, address, city, state, phone, email }));

    // Show Step 2
    step1.classList.remove('active');
    step2.classList.add('active');
  });

  // Step 2: Payment Details
  if (!paymentForm) {
    console.error('Payment form not found.');
    return;
  }

  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Fetch billing details
    const billingDetails = JSON.parse(localStorage.getItem('billingDetails') || '{}');

    // Collect payment details
    const cardNumber = (document.getElementById('card-number') as HTMLInputElement)?.value.trim();
    const cardExpiration = (document.getElementById('card-expiration') as HTMLInputElement)?.value.trim();
    const cardCVV = (document.getElementById('card-cvv') as HTMLInputElement)?.value.trim();

    if (!cardNumber || !cardExpiration || !cardCVV) {
      alert('Please complete all payment details.');
      return;
    }

    // Simulate payment success
    const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success
    if (isPaymentSuccessful) {
      alert('Payment successful!');

      // Display receipt
      displayReceipt({ ...billingDetails, cardNumber, cardExpiration });

      // Clear local storage
      localStorage.removeItem('billingDetails');
      localStorage.removeItem('cart');

      // Redirect to index.html after 5 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 5000); // Delay in milliseconds
    } else {
      alert('Payment failed. Please try again.');
    }
  });
}

/**
 * Displays receipt with customer and payment details
 */
function displayReceipt(details: Record<string, string>): void {
  const receiptContainer = document.getElementById('receipt-container')!;
  const customerNameElement = document.getElementById('customer-name')!;
  const paymentDateElement = document.getElementById('payment-date')!;
  const customerAddressElement = document.getElementById('customer-address')!;
  const customerPhoneElement = document.getElementById('customer-phone')!;
  const customerEmailElement = document.getElementById('customer-email')!;
  const productListElement = document.getElementById('product-list')!;
  const totalAmountElement = document.getElementById('total-amount')!;
  const printButton = document.getElementById('print-receipt-btn')!;

  // Populate receipt with billing details
  customerNameElement.textContent = `Cardholder: ${details.cardName}`;
  customerAddressElement.textContent = `Address: ${details.address}, ${details.city}, ${details.state}`;
  customerPhoneElement.textContent = `Phone: ${details.phone}`;
  customerEmailElement.textContent = `Email: ${details.email}`;

  // Generate payment date
  const paymentDate = new Date().toLocaleString();
  paymentDateElement.textContent = `Date: ${paymentDate}`;

  // Fetch cart data from local storage
  const cartData = JSON.parse(localStorage.getItem('cart') || '[]');

  if (!Array.isArray(cartData)) {
    console.error('Cart data is invalid. Clearing cart.');
    localStorage.removeItem('cart');
    return;
  }

  if (cartData.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  // Populate product list and calculate total
  productListElement.innerHTML = '';
  let total = 0;
  cartData.forEach((item: { name: string; quantity: number; price: number }) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.quantity} pcs - €${item.price.toFixed(2)}`;
    productListElement.appendChild(listItem);
    total += item.quantity * item.price;
  });

  totalAmountElement.textContent = `Total: €${total.toFixed(2)}`;

  // Show the receipt container
  receiptContainer.style.display = 'block';

  // Enable print functionality
  printButton.style.display = 'block';
  printButton.onclick = () => window.print();
}

// Initialize the two-step payment process on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => processPayment());
