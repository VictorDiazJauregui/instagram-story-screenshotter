export const countStories = async (page, account) => {
  // Hago click en la historia
  await page.locator('header > section > div > div > canvas').click();
  // Valido que haya cargado el visor de las historias
  await page.waitForSelector('svg[aria-label="Menú"]');
  // Cuento la cantidad de historias
  const count = await page.locator('section > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div').count();
  console.log('Account:', account.username);
  console.log(`Has ${count} stories`);
  console.log('==================');
  await page.waitForTimeout(100);
};