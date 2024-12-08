import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Scraping of Instagram counts', async ({ page }) => {
  // Inicio de sesión
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector('#loginForm');
  await page.locator('input[name="username"]').pressSequentially(process.env.INSTAGRAM_USERNAME, { delay: 10 });
  await page.locator('input[name="password"]').pressSequentially(process.env.INSTAGRAM_PASSWORD, { delay: 10 });
  await page.click('button[type="submit"]');
  // Valido mediante una notificación que se haya iniciado sesión correctamente
  await page.waitForSelector('main > div > div > div > section > div > button');
});
