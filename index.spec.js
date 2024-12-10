import { test } from '@playwright/test';
import { accounts, username, password } from './config';
import { login } from './utils/login';
import { countStories } from './utils/storyCounter';
import { navigateToProfile } from './utils/navigateToProfile';
import { checkForStories } from './utils/checkForStories';
import { navigateToFirstStory } from './utils/navigateToFirstStory';
import { takeScreenshot } from './utils/takeScreenshot';

test('Scraping of Instagram counts', async ({ page }) => {
  test.setTimeout(240000);
  await login(page, username, password);

  for (const account of accounts) {
    await navigateToProfile(page, account);

    if (await checkForStories(page)) {
      await countStories(page, account);
      await navigateToFirstStory(page);

      let storyNumber = 1;
      await takeScreenshot(page, account, storyNumber);

      while (await page.locator('svg[aria-label="Siguiente"]').count() > 0) {
        await page.locator('svg[aria-label="Siguiente"]').click();
        await page.waitForTimeout(3000);
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
});
