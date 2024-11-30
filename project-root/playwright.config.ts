import { defineConfig, devices } from '@playwright/test';

/**
 * Katso lisää testikonfiguraatioista: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  webServer: {
    command: 'npm run start', // Käynnistä sovellus
    url: 'http://localhost:3000', // Varmista, että palvelin toimii tässä osoitteessa
    reuseExistingServer: !process.env.CI,
  },
  testDir: './tests', // Testikansio
  fullyParallel: true, // Suorita testit rinnakkain
  forbidOnly: !!process.env.CI, // Estää vahingossa jätetyn test.only-käytön
  retries: process.env.CI ? 2 : 0, // Yritä epäonnistuneet testit kahdesti vain CI:ssä
  workers: process.env.CI ? 1 : undefined, // Opt out rinnakkaisista testeistä CI:ssä
  reporter: 'html', // Luo HTML-raportti testien tuloksista

  use: {
    /* Perusasetukset kaikille projekteille */
    trace: 'on-first-retry', // Kerää jäljitystiedot epäonnistuneille testeille
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Testaa Chrome-selaimella
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }, // Testaa Firefoxilla
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }, // Testaa Safarilla
    },
  ],

  /* Paikallinen kehityspalvelin ennen testien ajamista */
  // webServer: {
  //   command: 'npm run start', // Käynnistää palvelimen
  //   url: 'http://127.0.0.1:3000', // Osoite, jossa palvelin on käynnissä
  //   reuseExistingServer: !process.env.CI, // Käytä olemassa olevaa palvelinta, jos mahdollista
  // },
});
