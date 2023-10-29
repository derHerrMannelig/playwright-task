import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const { faker } = require('@faker-js/faker');
const randomLogin = faker.internet.userName();
const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();
const randomName = faker.person.firstName();
const randomSurname = faker.person.lastName();
const randomQuery = faker.word.words(2);
const testData = JSON.parse(JSON.stringify(require('../data/test-data.json')));

let context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext({ ignoreHTTPSErrors: true });
});

test.afterAll(async () => {
  await context.close();
});

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
  await expect(await mainPage.getFlashError()).toBeVisible();
  await expect(await mainPage.getFlashError()).toHaveText('Invalid user or password');
});

test('password reset at login page', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await mainPage.clickLostPasswordButton();
  await expect(page).toHaveURL('/account/lost_password');
  await mainPage.fillReset(randomEmail);
  await expect(await mainPage.getResetEmail()).toHaveValue(randomEmail);
  await mainPage.clickResetSubmit();
  await expect(page).toHaveURL('/account/lost_password');
  await expect(await mainPage.getFlashError()).toBeVisible();
  await expect(await mainPage.getFlashError()).toHaveText('Unknown user.');
  await mainPage.fillReset(testData.user.email);
  await expect(await mainPage.getResetEmail()).toHaveValue(testData.user.email);
  await mainPage.clickResetSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await mainPage.getFlashNotice()).toBeVisible();
  await expect(await mainPage.getFlashNotice()).toHaveText('An email with instructions to choose a new password has been sent to you.');
});

test('registration testing', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickRegisterButton();
  await expect(page).toHaveURL('/account/register');
  for (const asterisk of (await mainPage.getAsterisks())) {
    await expect(asterisk).toBeVisible();
  };
  await mainPage.clickRegisterSubmit();
  await expect(page).toHaveURL('/account/register');
  await expect(await mainPage.getRegisterError()).toBeVisible();
  await mainPage.fillRegistrationForm(randomLogin, randomPassword, randomName, randomSurname, randomEmail);
  await expect(await mainPage.getRegisterLogin()).toHaveValue(randomLogin);
  await expect(await mainPage.getRegisterPassword()).toHaveValue(randomPassword);
  await expect(await mainPage.getRegisterConfirmation()).toHaveValue(randomPassword);
  await expect(await mainPage.getRegisterFirstName()).toHaveValue(randomName);
  await expect(await mainPage.getRegisterLastName()).toHaveValue(randomSurname);
  await expect(await mainPage.getRegisterEmail()).toHaveValue(randomEmail);
  await mainPage.clickRegisterSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await mainPage.getFlashNotice()).toBeVisible();
  await expect(await mainPage.getFlashNotice()).toHaveText(`Account was successfully created. An email containing the instructions to activate your account was sent to ${randomEmail}.`);
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
