import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const { faker } = require('@faker-js/faker');
const randomLogin = faker.internet.userName();
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('login error with invalid credentials', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await mainPage.fillCredentials(randomLogin, randomPassword);
  await expect(await mainPage.getLogin()).toHaveValue(randomLogin);
  await expect(await mainPage.getPassword()).toHaveValue(randomPassword);
  await mainPage.clickLoginSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await mainPage.getFlashError()).toBeVisible();
  await expect(await mainPage.getFlashError()).toHaveText('Invalid user or password');
});
