import axios from 'axios';

export function setupAuthListeners() {
  const signUpForm = document.querySelector('.sign-up-form') as HTMLFormElement | null;
  const loginForm = document.querySelector('.sign-in-form') as HTMLFormElement | null;

  if (signUpForm) {
    signUpForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const usernameInput = signUpForm.querySelector('input[placeholder="Username"]') as HTMLInputElement;
      const emailInput = signUpForm.querySelector('input[placeholder="Email"]') as HTMLInputElement;
      const passwordInput = signUpForm.querySelector('input[placeholder="Password"]') as HTMLInputElement;
      const phoneInput = signUpForm.querySelector('input[placeholder="Phone"]') as HTMLInputElement;

      try {
        const response = await axios.post('/api/auth/signup', {
          username: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          phone: phoneInput.value,
        });

        if (response.status === 201) {
          console.log('Sign-up successful!');
        }
      } catch (error) {
        console.error('Sign-up error:', error);
        alert('Sign-up failed. Please try again.');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = (document.querySelector('input[placeholder="Email"]') as HTMLInputElement).value;
      const password = (document.querySelector('input[placeholder="Password"]') as HTMLInputElement).value;

      try {
        const response = await axios.post('http://localhost:3000/api/auth/signin', { email, password });
        if (response.status === 200) {
          const { userId, username } = response.data;
          localStorage.setItem('userId', userId);
          localStorage.setItem('username', username);

          document.getElementById('username-display')!.innerText = `Welcome, ${username}`;
          document.getElementById('username-display')!.style.display = 'block';
          window.location.href = 'index.html';
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Sign-in error:', error);
        alert('Sign-in failed. Please check your credentials.');
      }
    });
  }

  window.addEventListener('load', () => {
    const username = localStorage.getItem('username');
    if (username) {
      document.getElementById('username-display')!.innerText = `Welcome, ${username}`;
      document.getElementById('username-display')!.style.display = 'block';
    }
  });
}

export function logout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  document.getElementById('username-display')!.style.display = 'none';
  window.location.href = 'index.html';
}
