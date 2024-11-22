export function processPayment(): void {
    const paymentForm = document.getElementById('payment-form') as HTMLFormElement | null;

    if (!paymentForm) {
        console.error('Payment form not found on the page.');
        return;
    }

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Retrieve form input values
        const cardNumber = (document.getElementById('card-number') as HTMLInputElement)?.value.trim();
        const cardName = (document.getElementById('card-name') as HTMLInputElement)?.value.trim();
        const cardExpiration = (document.getElementById('card-expiration') as HTMLInputElement)?.value.trim();
        const cardCVV = (document.getElementById('card-cvv') as HTMLInputElement)?.value.trim();
        const cardPostalCode = (document.getElementById('card-postal-code') as HTMLInputElement)?.value.trim();

        // Validate form inputs
        if (!cardNumber || !cardName || !cardExpiration || !cardCVV || !cardPostalCode) {
            alert('Please fill in all payment details.');
            return;
        }

        // Simulate payment success or failure
        const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success for demonstration purposes

        if (isPaymentSuccessful) {
            alert('Payment successful!');
            paymentForm.reset();
            localStorage.removeItem('cart'); // Clear the cart
            window.location.href = 'index.html'; // Redirect to the homepage
        } else {
            alert('Payment failed. Please try again.');
        }
    });
}

// Attach the payment processing logic when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    processPayment();
});
