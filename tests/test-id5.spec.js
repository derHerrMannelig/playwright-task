import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/page.js';

const { faker } = require('@faker-js/faker');
const randomQuery = faker.word.words(2);

test.beforeEach(async ({ page }) => {
  await page.goto('');
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
