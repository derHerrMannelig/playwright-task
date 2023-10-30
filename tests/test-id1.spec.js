const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main-page.js');
const { LoginPage } = require('../pages/login-page.js');

const testData = JSON.parse(JSON.stringify(require('../data/test-data.json')));

let mainPage;
let loginPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new LoginPage(page);
  await mainPage.gotoBaseUrl();
});

test('login', async ({ page }) => {
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await loginPage.fillCredentials(testData.user.username, testData.user.password);
  await expect(await loginPage.getLogin()).toHaveValue(testData.user.username);
  await expect(await loginPage.getPassword()).toHaveValue(testData.user.password);
  await loginPage.clickLoginSubmit();
  await expect(page).toHaveURL('');
  await expect(await mainPage.getLoggedAs()).toBeVisible();
  await expect(await mainPage.getLoggedAs()).toHaveText(`Logged in as ${testData.user.username}`);
});
