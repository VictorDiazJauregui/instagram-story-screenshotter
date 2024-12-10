export const checkForStories = async (page) => {
  return await page.locator('header > section > div > div > span > img').count() > 0;
};