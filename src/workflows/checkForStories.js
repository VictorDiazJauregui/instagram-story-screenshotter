import { profilePicture } from '../utils/selectors.js';

export const checkForStories = async (page) => {
  return (await page.locator(profilePicture).count()) > 0;
};
