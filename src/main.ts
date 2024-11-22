import { setupAuthListeners, logout } from './auth';
import { loadCart, reloadCart, clearCart, loadProducts } from './cartAndProduct';
import { setupFeedbackForm } from './feedback';
import { setupNavListeners } from './nav';


document.addEventListener('DOMContentLoaded', () => {
  setupAuthListeners();
  loadCart();
  reloadCart();
  loadProducts();
  setupFeedbackForm();
  setupNavListeners();


  (window as any).logout = logout;
  (window as any).clearCart = clearCart;
});
