import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const accounts = JSON.parse(process.env.INSTAGRAM_ACCOUNTS);

test('Scraping of Instagram counts', async ({ page }) => {
  test.setTimeout(180000);
  // Inicio de sesión
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector('#loginForm');
  await page.locator('input[name="username"]').pressSequentially(process.env.INSTAGRAM_USERNAME, { delay: 20 });
  await page.locator('input[name="password"]').pressSequentially(process.env.INSTAGRAM_PASSWORD, { delay: 20 });
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
      await page.waitForSelector('svg[aria-label="Menú"]');
      // Cuento la cantidad de historias
      const count = await page.locator('section > div > div > div > div > div > div:nth-child(1) > div > div:nth-child(1) > div').count();
      await page.waitForTimeout(100);

      // Si figura la flecha de anterior, la clickeo varias veces hasta llegar a la primera historia
      while (await page.locator('svg[aria-label="Anterior"]').count() > 0) {
        await page.locator('svg[aria-label="Anterior"]').click();
        await page.waitForTimeout(100); 
      }

      // Valido que se haya cargado el boton de pausar
      await page.waitForSelector('svg[aria-label=Pausar]');
      page.locator('svg[aria-label=Pausar]').click();
      
      // Valido que se haya cargado la imagen o video de la primera historia
      await page.waitForSelector('section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > img, section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div > div > video'); 

      // Hago screenshot de la primera historia y la guardo en la carpeta screenshots
      let storyNumber = 1;
      await page.waitForTimeout(500); // Espera de 500ms antes de capturar la imagen
      await page.locator('section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > img, section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div > div > video').screenshot({ path: `screenshots/${account.username}_${storyNumber}_${new Date().toLocaleDateString().replace(/\//g, '')}.png` });

      // Ciclo para recorrer las historias y guardarlas en la carpeta screenshots
      while (await page.locator('svg[aria-label="Siguiente"]').count() > 0) {
        await page.locator('svg[aria-label="Siguiente"]').click();
        await page.waitForTimeout(100);
        storyNumber++;
        await page.locator('svg[aria-label=Pausar]').click();
        await page.waitForSelector('section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > img, section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div > div > video');
        await page.waitForTimeout(500); // Espera de 500ms antes de capturar la imagen
        await page.locator('section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > img, section > div > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div > div > div > video').screenshot({ path: `screenshots/${account.username}_${storyNumber}_${new Date().toLocaleDateString().replace(/\//g, '')}.png` });
      }
      
      console.log('Account:', account.username);
      console.log(`Has ${count} stories`);
    } else {
      console.log('Account:', account.username);
      console.log('No story');
    }
    console.log('==================');
  }
});
