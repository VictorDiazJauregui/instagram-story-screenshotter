import { profilePicture } from '../constants/selectors.js';

export const checkForStories = async (page) => {
  return (await page.locator(profilePicture).count()) > 0;
};
