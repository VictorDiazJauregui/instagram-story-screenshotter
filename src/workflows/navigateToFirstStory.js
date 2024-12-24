import { previousStory, pauseStory } from '../constants/selectors.js';

export const navigateToFirstStory = async (page) => {
  while ((await page.locator(previousStory).count()) > 0) {
    await page.locator(previousStory).click();
    await page.waitForTimeout(100);
  }
  await page.waitForSelector(pauseStory);
  page.locator(pauseStory).click();
};
