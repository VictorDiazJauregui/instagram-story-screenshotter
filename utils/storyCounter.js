import { storyCanvas, storyCount } from './selectors.js';

export const countStories = async (page, account) => {
  // Hago click en la historia
  await page.locator(storyCanvas).click();
  // Valido que haya cargado el visor de las historias
  await page.waitForSelector('svg[aria-label="Menú"]');
  // Cuento la cantidad de historias
  const count = await page.locator(storyCount).count();
  console.log('Account:', account.username);
  console.log(`Has ${count} stories`);
  console.log('==================');
  await page.waitForTimeout(100);
};
