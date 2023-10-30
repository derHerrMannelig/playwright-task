import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main-page.js';
import { LoginPage } from '../pages/login-page.js';
import { RegisterPage } from '../pages/register-page.js';

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
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);
  await mainPage.clickRegisterButton();
  await expect(page).toHaveURL('/account/register');
  for (const asterisk of (await registerPage.getAsterisks())) {
    await expect(asterisk).toBeVisible();
  };
  await registerPage.clickRegisterSubmit();
  await expect(page).toHaveURL('/account/register');
  await expect(await registerPage.getRegisterError()).toBeVisible();
  await registerPage.fillRegistrationForm(randomLogin, randomPassword, randomName, randomSurname, randomEmail);
  await expect(await registerPage.getRegisterLogin()).toHaveValue(randomLogin);
  await expect(await registerPage.getRegisterPassword()).toHaveValue(randomPassword);
  await expect(await registerPage.getRegisterConfirmation()).toHaveValue(randomPassword);
  await expect(await registerPage.getRegisterFirstName()).toHaveValue(randomName);
  await expect(await registerPage.getRegisterLastName()).toHaveValue(randomSurname);
  await expect(await registerPage.getRegisterEmail()).toHaveValue(randomEmail);
  await registerPage.clickRegisterSubmit();
  await expect(page).toHaveURL('/login');
  await expect(await loginPage.getFlashNotice()).toBeVisible();
  await expect(await loginPage.getFlashNotice()).toHaveText(`Account was successfully created. An email containing the instructions to activate your account was sent to ${randomEmail}.`);
});
