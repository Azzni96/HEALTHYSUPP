
import { setupAuthListeners, logout } from './auth';
import { loadCart, reloadCart, clearCart, loadProducts } from './cartAndProduct';
import { setupFeedbackForm } from './feedback';
import { setupNavListeners } from './nav';
import './indexProducts' // Import the indexProducts.ts file to run the code inside it
document.addEventListener('DOMContentLoaded', () => {


    // General setup for all pages
    setupAuthListeners();
    setupNavListeners();
    loadCart();
    reloadCart();
    loadProducts();
    setupFeedbackForm();


    // Attach global functions to the window for accessibility in HTML
    (window as any).logout = logout;
    (window as any).clearCart = clearCart;


});
// Hae dialogit ja painikkeet
const forgotDialog = document.getElementById('forgot-password-dialog') as HTMLDialogElement;
const resetDialog = document.getElementById('reset-password-dialog') as HTMLDialogElement;

// Dialogien avaus ja sulkeminen
document.getElementById('open-forgot-dialog')?.addEventListener('click', () => forgotDialog.showModal());
document.getElementById('open-reset-dialog')?.addEventListener('click', () => resetDialog.showModal());

document.getElementById('close-forgot-dialog')?.addEventListener('click', () => forgotDialog.close());
document.getElementById('close-reset-dialog')?.addEventListener('click', () => resetDialog.close());
const apiBaseUrl = 'http://localhost:3000/api/auth';


// Forgot Password -lomakkeen käsittely
document.getElementById('forgot-password-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = (document.getElementById('forgot-email') as HTMLInputElement).value;

  try {
    const response = await fetch(`${apiBaseUrl}/forgot-password`, { // Muutettu osoite
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    (document.getElementById('forgot-message') as HTMLElement).innerText = data.message;
  } catch (error) {
    console.error('Error:', error);
    (document.getElementById('forgot-message') as HTMLElement).innerText = 'An error occurred';
  }
});

// Reset Password -lomake
document.getElementById('reset-password-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = (document.getElementById('reset-token') as HTMLInputElement).value;
  const password = (document.getElementById('new-password') as HTMLInputElement).value;

  try {
    const response = await fetch(`${apiBaseUrl}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });

    const data = await response.json();
    (document.getElementById('reset-message') as HTMLElement).innerText = data.message;
  } catch (error) {
    console.error('Error:', error);
    (document.getElementById('reset-message') as HTMLElement).innerText = 'An error occurred';
  }
});

// Hae token URL-polusta
const pathParts = window.location.pathname.split('/');
const token = pathParts[pathParts.length - 1]; // Hae viimeinen osa URL:stä (token)

// Jos token löytyy, avaa resetointi-dialogi
if (window.location.pathname.startsWith('api/auth/reset-password/') && token) {
  resetDialog.showModal(); // Avaa dialogi
  (document.getElementById('reset-token') as HTMLInputElement).value = token;
}
