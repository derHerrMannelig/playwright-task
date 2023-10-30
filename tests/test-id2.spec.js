const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main-page.js');
const { LoginPage } = require('../pages/login-page.js');

const { faker } = require('@faker-js/faker');
const randomLogin = faker.internet.userName();
const randomPassword = faker.internet.password();

let mainPage;
let loginPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new LoginPage(page);
  await mainPage.gotoBaseUrl();
});

test('login error', async ({ page }) => {
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
