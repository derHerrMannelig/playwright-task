const { Page } = require('./page.js');

const signIn = 'a.login';
const register = 'a.register[href="/account/register"]';
const loggedAs = 'div#loggedas';
const navSearch = 'input#q.small';

class MainPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async gotoBaseUrl() {
    await super.openUrl('');
  }

  async getLoggedAs() {
    return super.getElement(loggedAs);
  }
  async getNavSearch() {
    return super.getElement(navSearch);
  }

  async clickSignInButton() {
    await super.clickElement(signIn);
  }
  async clickRegisterButton() {
    await super.clickElement(register);
  }
  async fillNavSearch (query) {
    await (await super.getElement(navSearch)).fill(query);
  }
}

module.exports = { MainPage };
