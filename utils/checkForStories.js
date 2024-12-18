export const checkForStories = async (page) => {
  return (
    (await page
      .locator('header > section > div > span > div > div > span > img')
      .count()) > 0
  );
};
