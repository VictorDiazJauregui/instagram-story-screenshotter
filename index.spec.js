import { test } from '@playwright/test';
import { accounts, username, password } from './config';
import { login } from './utils/login';
import { countStories } from './utils/storyCounter';

test('Scraping of Instagram counts', async ({ page }) => {
  test.setTimeout(180000);
  // Inicio sesión
  await login(page, username, password);
  
  // Recorrido de las cuentas a validar
  for (const account of accounts) {
    await page.goto(account.link);
    // Valido mediante el div tablist que se haya cargado el perfil
    await page.waitForSelector('div[role="tablist"]');
    // Valido mediante el span > img que haya una historia (caso contrario, no hay historia ya que es a > img)
    const hasStory = await page.locator('header > section > div > div > span > img').count() > 0;
    if (hasStory) {
      // Cuento la cantidad de historias
      await countStories(page, account);

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
    } else {
      console.log('Account:', account.username);
      console.log('No story');
      console.log('==================');
    }
  }
});
