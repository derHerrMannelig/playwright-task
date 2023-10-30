import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page.js';
import { LoginPage } from '../pages/login-page.js';

const { faker } = require('@faker-js/faker');
const randomEmail = faker.internet.email();
const testData = JSON.parse(JSON.stringify(require('../data/test-data.json')));

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('password reset at login page', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPage = new LoginPage(page);
  await mainPage.clickSignInButton();
  await expect(page).toHaveURL('/login');
  await loginPage.clickLostPasswordButton();
  await expect(page).toHaveURL('/account/lost_password');
  await loginPage.fillReset(randomEmail);
  await expect(await loginPage.getResetEmail()).toHaveValue(randomEmail);
  await loginPage.clickResetSubmit();
  await expect(page).toHaveURL('/account/lost_password');
  await expect(await loginPage.getFlashError()).toBeVisible();
  await expect(await loginPage.getFlashError()).toHaveText('Unknown user.');
  await loginPage.fillReset(testData.user.email);
  await expect(await loginPage.getResetEmail()).toHaveValue(testData.user.email);
  await loginPage.clickResetSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await loginPage.getFlashNotice()).toBeVisible();
  await expect(await loginPage.getFlashNotice()).toHaveText('An email with instructions to choose a new password has been sent to you.');
});
