import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const { faker } = require('@faker-js/faker');
const randomLogin = faker.internet.userName();
const randomPassword = faker.internet.password();
const randomQuery = faker.word.words(2);
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

test('login error with invalid credentials', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await mainPage.fillCredentials(randomLogin, randomPassword);
  await expect(await mainPage.getLogin()).toHaveValue(randomLogin);
  await expect(await mainPage.getPassword()).toHaveValue(randomPassword);
  await mainPage.clickLoginSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await mainPage.getLoginError()).toBeVisible();
  await expect(await mainPage.getLoginError()).toHaveText('Invalid user or password');
});

test('search with random query', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.fillNavSearch(randomQuery);
  await expect(await mainPage.getNavSearch()).toHaveValue(randomQuery);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp('/projects/redmine/search'));
  await expect(await mainPage.getMainSearch()).toHaveValue(randomQuery);
  await expect(await mainPage.getSearchResults()).toBeAttached();
});

test('registration requirements', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickRegisterButton();
  await expect(page).toHaveURL('/account/register');
  for (const asterisk of (await mainPage.getAsterisks())) {
    await expect(asterisk).toBeVisible();
  };
  await mainPage.clickRegisterSubmit();
  await expect(page).toHaveURL('/account/register');
  await expect(await mainPage.getRegisterError()).toBeVisible();
});
