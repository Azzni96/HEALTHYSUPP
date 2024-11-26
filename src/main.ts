import { processPayment } from './payment';
import { setupAuthListeners, logout } from './auth';
import { loadCart, reloadCart, clearCart, loadProducts } from './cartAndProduct';
import { setupFeedbackForm } from './feedback';
import { setupNavListeners } from './nav';

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    // General setup for all pages
    setupAuthListeners();
    setupNavListeners();
    loadCart();
    reloadCart();
    loadProducts();
    setupFeedbackForm();

    // Page-specific setup
    if (currentPage.includes('maksu.html')) {
        processPayment();
    }

    // Attach global functions to the window for accessibility in HTML
    (window as any).logout = logout;
    (window as any).clearCart = clearCart;

});
