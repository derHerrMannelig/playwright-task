const signIn = 'a.login';
const register = 'a.register[href="/account/register"]';
const loggedAs = 'div#loggedas';
const navSearch = 'input#q.small';

export class MainPage {
  constructor(page){
    this.page = page;
  }

  async getLoggedAs() {
    return this.page.locator(loggedAs);
  }
  async getNavSearch() {
    return this.page.locator(navSearch);
  }

  async clickSignInButton() {
    await this.page.click(signIn);
  }
  async clickRegisterButton() {
    await this.page.click(register);
  }
  async fillNavSearch (query) {
    await this.page.locator(navSearch).fill(query);
  }
}
