export const navigateToFirstStory = async (page) => {
  while ((await page.locator('svg[aria-label="Anterior"]').count()) > 0) {
    await page.locator('svg[aria-label="Anterior"]').click();
    await page.waitForTimeout(100);
  }
  await page.waitForSelector('svg[aria-label=Pausar]');
  page.locator('svg[aria-label=Pausar]').click();
};
