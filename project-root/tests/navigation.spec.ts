import { test, expect } from '@playwright/test';

test.describe('Sivuston navigointi', () => {
  test('Navigointi toimii oikein', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Tarkista "Shopping"-linkki
    await page.click('text=Shopping');
    await expect(page).toHaveURL(/Menu\.html/);

    // Tarkista "About"-linkki
    await page.click('text=About');
    await expect(page).toHaveURL(/#about/);

    // Tarkista "Contact"-linkki
    await page.click('text=Contact');
    await expect(page).toHaveURL(/#contact/);
  });
});
