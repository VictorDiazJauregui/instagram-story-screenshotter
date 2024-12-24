import { storyImage, storyVideo } from '../utils/selectors.js';

export const takeScreenshot = async (page, account, storyNumber) => {
  await page.waitForSelector(`${storyImage}, ${storyVideo}`);
  await page.waitForTimeout(500);

  const datePath = new Date().toLocaleDateString().replace(/\//g, '');
  const screenshotPath = `screenshots/${account.username}_${storyNumber}_${datePath}.png`;
  await page
    .locator(`${storyImage}, ${storyVideo}`)
    .screenshot({ path: screenshotPath });
};
