import { profileTabList } from '../constants/selectors.js';

export const profileService = async (page, account) => {
  await page.goto(account.link);
  await page.waitForSelector(profileTabList);
};
