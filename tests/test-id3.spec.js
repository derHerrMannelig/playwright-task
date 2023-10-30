import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const { faker } = require('@faker-js/faker');
const randomEmail = faker.internet.email();
const testData = JSON.parse(JSON.stringify(require('../data/test-data.json')));

test.beforeEach(async ({ page }) => {
  await page.goto('');
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
