import {
  loginForm,
  usernameInput,
  passwordInput,
  submitButton,
  notification,
} from '../utils/selectors.js';

export const loginService = async (page, username, password) => {
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector(loginForm);
  await page.locator(usernameInput).pressSequentially(username, { delay: 20 });
  await page.locator(passwordInput).pressSequentially(password, { delay: 20 });
  await page.click(submitButton);
  // Valido mediante una notificación que se haya iniciado sesión correctamente
  await page.waitForSelector(notification);
};
