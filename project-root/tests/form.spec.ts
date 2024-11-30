import { test, expect } from '@playwright/test';

test.describe('Lomakkeen validointi', () => {
  test('Lomake tallentaa tiedot tietokantaan', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('form#feedback-form #name', 'Test User');
    await page.fill('form#feedback-form #email', 'test@example.com');
    await page.fill('form#feedback-form #feedback', 'This is a test feedback.');

    await page.click('form#feedback-form button[type="submit"]');
    const feedbackList = await page.locator('#feedback-container').textContent();

    // Varmista, että palaute tallentui
    expect(feedbackList).toContain('Test User');
    expect(feedbackList).toContain('test@example.com');
    expect(feedbackList).toContain('This is a test feedback.');
  });
});
