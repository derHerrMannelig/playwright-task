import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const testData = JSON.parse(JSON.stringify(require('../data/test-data.json')));

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('correct login with valid credentials', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await mainPage.fillCredentials(testData.user.username, testData.user.password);
  await expect(await mainPage.getLogin()).toHaveValue(testData.user.username);
  await expect(await mainPage.getPassword()).toHaveValue(testData.user.password);
  await mainPage.clickLoginSubmit();
  await expect(page).toHaveURL('');
  await expect(await mainPage.getLoggedAs()).toBeVisible();
  await expect(await mainPage.getLoggedAs()).toHaveText(`Logged in as ${testData.user.username}`);
});
