import { profilePicture } from '../src/utils/selectors.js';

export const checkForStories = async (page) => {
  return (await page.locator(profilePicture).count()) > 0;
};
