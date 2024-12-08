import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const accounts = JSON.parse(process.env.INSTAGRAM_ACCOUNTS);

test('Scraping of Instagram counts', async ({ page }) => {
  // Inicio de sesión
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector('#loginForm');
  await page.locator('input[name="username"]').pressSequentially(process.env.INSTAGRAM_USERNAME, { delay: 10 });
  await page.locator('input[name="password"]').pressSequentially(process.env.INSTAGRAM_PASSWORD, { delay: 10 });
  await page.click('button[type="submit"]');
  // Valido mediante una notificación que se haya iniciado sesión correctamente
  await page.waitForSelector('main > div > div > div > section > div > button');
  
  // Recorrido de las cuentas a validar
  for (const account of accounts) {
    await page.goto(account.link);
    // Valido mediante el div tablist que se haya cargado el perfil
    await page.waitForSelector('div[role="tablist"]');
    // Valido mediante el span > img que haya una historia (caso contrario, no hay historia ya que es a > img)
    const hasStory = await page.locator('header > section > div > div > span > img').count() > 0;
    if (hasStory) {
      // Hago click en la historia
      await page.locator('header > section > div > div > canvas').click();
      // Valido que haya cargado el visor de las historias
      await page.waitForSelector('section > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div');
      // Cuento la cantidad de historias
      const count = await page.locator('section > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div').count();
      console.log('Account:', account.username);
      console.log(`Has ${count} stories`);
    } else {
      console.log('Account:', account.username);
      console.log('No story');
    }
    console.log('==================');
  }
});
