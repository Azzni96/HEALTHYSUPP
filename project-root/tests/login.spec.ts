import { test, expect } from '@playwright/test';

test.describe('Sisäänkirjautuminen', () => {
  test('Sisäänkirjautuminen onnistuu', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('#LoginBtn');
    await page.fill('form.sign-in-form input[placeholder="Email"]', 'test@example.com');
    await page.fill('form.sign-in-form input[placeholder="Password"]', 'password123');
    await page.click('form.sign-in-form input[type="submit"]');

    // Tarkista sisäänkirjautumisen onnistuminen
    const usernameDisplay = await page.locator('#username-display').textContent();
    expect(usernameDisplay).toContain('Welcome, TestUser');
  });
});
