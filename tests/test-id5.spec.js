const { test, expect } = require('@playwright/test');
const { MainPage } = require('../pages/main-page.js');
const { SearchPage } = require('../pages/search-page.js');

const { faker } = require('@faker-js/faker');
const randomQuery = faker.word.words(2);

let mainPage;
let searchPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  searchPage = new SearchPage(page);
  await mainPage.gotoBaseUrl();
});

test('search', async ({ page }) => {
  const mainPage = new MainPage(page);
  const searchPage = new SearchPage(page);
  await mainPage.fillNavSearch(randomQuery);
  await expect(await mainPage.getNavSearch()).toHaveValue(randomQuery);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new RegExp('/projects/redmine/search'));
  await expect(await searchPage.getMainSearch()).toHaveValue(randomQuery);
  await expect(await searchPage.getSearchResults()).toBeAttached();
});
