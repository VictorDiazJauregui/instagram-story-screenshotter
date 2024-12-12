export const login = async (page, username, password) => {
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector('#loginForm');
  await page
    .locator('input[name="username"]')
    .pressSequentially(username, { delay: 20 });
  await page
    .locator('input[name="password"]')
    .pressSequentially(password, { delay: 20 });
  await page.click('button[type="submit"]');
  // Valido mediante una notificación que se haya iniciado sesión correctamente
  await page.waitForSelector('main > div > div > div > section > div > button');
};
