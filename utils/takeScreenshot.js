export const takeScreenshot = async (page, account, storyNumber) => {
  const path =
    'section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div';
  const pathImg = `${path} > img`;
  const pathVideo = `${path} > div > div > div > div > div > video`;
  await page.waitForSelector(`${pathImg}, ${pathVideo}`);
  await page.waitForTimeout(500);

  const datePath = new Date().toLocaleDateString().replace(/\//g, '');
  const screenshotPath = `screenshots/${account.username}_${storyNumber}_${datePath}.png`;
  await page
    .locator(`${pathImg}, ${pathVideo}`)
    .screenshot({ path: screenshotPath });
};
