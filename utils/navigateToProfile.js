import { profileTabList } from './selectors.js';

export const navigateToProfile = async (page, account) => {
  await page.goto(account.link);
  await page.waitForSelector(profileTabList);
};
