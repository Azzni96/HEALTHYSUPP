import { test, expect } from '@playwright/test';

test.describe('Visuaalinen vertailu', () => {
  test('Etusivu näyttää odotetulta', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Ota kuvakaappaus
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot('homepage.png', { threshold: 0.1 });
  });
});
