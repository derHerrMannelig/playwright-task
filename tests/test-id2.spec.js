import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page.js';
import { LoginPage } from '../pages/login-page.js';

const { faker } = require('@faker-js/faker');
const randomLogin = faker.internet.userName();
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('login error with invalid credentials', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await loginPage.fillCredentials(randomLogin, randomPassword);
  await expect(await loginPage.getLogin()).toHaveValue(randomLogin);
  await expect(await loginPage.getPassword()).toHaveValue(randomPassword);
  await loginPage.clickLoginSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await loginPage.getFlashError()).toBeVisible();
  await expect(await loginPage.getFlashError()).toHaveText('Invalid user or password');
});
