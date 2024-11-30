import { test, expect } from '@playwright/test';

test.describe('Sisäänkirjautuneen toiminnallisuus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('#LoginBtn');
    await page.fill('form.sign-in-form input[placeholder="Email"]', 'test@example.com');
    await page.fill('form.sign-in-form input[placeholder="Password"]', 'password123');
    await page.click('form.sign-in-form input[type="submit"]');
  });

  test('Tuotteen lisääminen ostoskoriin toimii', async ({ page }) => {
    await page.goto('http://localhost:3000/Menu.html');
    await page.click('.add-to-cart');

    const cartQuantity = await page.locator('.quantity').textContent();
    expect(cartQuantity).toBe('1');
  });
});
