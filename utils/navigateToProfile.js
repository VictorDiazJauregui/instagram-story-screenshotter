export const navigateToProfile = async (page, account) => {
  await page.goto(account.link);
  await page.waitForSelector('div[role="tablist"]');
};
