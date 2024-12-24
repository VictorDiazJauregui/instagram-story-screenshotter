import { firefox } from 'playwright';
import { accounts, username, password } from './config/index.js';
import { loginService } from './src/services/loginService.js';
import { nextStory, pauseStory } from './src/utils/selectors.js';
import { countStories } from './src/workflows/storyCounter.js';
import { profileService } from './src/services/profileService.js';
import { checkForStories } from './src/workflows/checkForStories.js';
import { navigateToFirstStory } from './src/workflows/navigateToFirstStory.js';
import { takeScreenshot } from './src/workflows/takeScreenshot.js';

const storiesScreenshot = async () => {
  // Configuración de Playwright
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({ locale: 'es-ES' });
  const page = await context.newPage();

  // Inicio de sesión
  await loginService(page, username, password);

  // Recorrido de las cuentas
  for (const account of accounts) {
    await profileService(page, account);

    if (await checkForStories(page)) {
      await countStories(page, account);
      await navigateToFirstStory(page);

      let storyNumber = 1;
      await takeScreenshot(page, account, storyNumber);

      while ((await page.locator(nextStory).count()) > 0) {
        await page.locator(nextStory).click();
        await page.waitForTimeout(2000);
        storyNumber++;
        await page.locator(pauseStory).click();
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
