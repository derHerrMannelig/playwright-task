import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const { faker } = require('@faker-js/faker');
const randomLogin = faker.internet.userName();
const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();
const randomName = faker.person.firstName();
const randomSurname = faker.person.lastName();

test.beforeEach(async ({ page }) => {
  await page.goto('');
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
