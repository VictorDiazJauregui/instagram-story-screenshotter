import { firefox } from 'playwright';
import { accounts, username, password } from './config.js';
import { login } from './utils/login.js';
import { countStories } from './utils/storyCounter.js';
import { navigateToProfile } from './utils/navigateToProfile.js';
import { checkForStories } from './utils/checkForStories.js';
import { navigateToFirstStory } from './utils/navigateToFirstStory.js';
import { takeScreenshot } from './utils/takeScreenshot.js';

const storiesScreenshot = async () => {
  // Configuración de Playwright
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ locale: 'es-ES' });
  const page = await context.newPage();

  // Inicio de sesión
  await login(page, username, password);

  // Recorrido de las cuentas
  for (const account of accounts) {
    await navigateToProfile(page, account);

    if (await checkForStories(page)) {
      await countStories(page, account);
      await navigateToFirstStory(page);

      let storyNumber = 1;
      await takeScreenshot(page, account, storyNumber);

      while ((await page.locator('svg[aria-label="Siguiente"]').count()) > 0) {
        await page.locator('svg[aria-label="Siguiente"]').click();
        await page.waitForTimeout(2000);
        storyNumber++;
        await page.locator('svg[aria-label=Pausar]').click();
        await takeScreenshot(page, account, storyNumber);
      }
    } else {
      console.log('Account:', account.username);
      console.log('No story');
      console.log('==================');
    }
  }

  // Cierre del navegador
  await browser.close();
};

storiesScreenshot();
