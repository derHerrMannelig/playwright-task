const signIn = 'a.login';
const login = 'input#username';
const password = 'input#password';
const loginSubmit = 'input#login-submit';
const loggedAs = 'div#loggedas';
const loginError = 'div#flash_error';
const navSearch = 'input#q.small';
const mainSearch = 'input#search-input';
const searchResults = 'dl#search-results';

export class MainPage {
  constructor(page){
    this.page = page;
  }

  async getLogin() {
    return this.page.locator(login);
  }
  async getPassword() {
    return this.page.locator(password);
  }
  async getLoggedAs() {
    return this.page.locator(loggedAs);
  }
  async getLoginError() {
    return this.page.locator(loginError);
  }
  async getNavSearch() {
    return this.page.locator(navSearch);
  }
  async getMainSearch() {
    return this.page.locator(mainSearch);
  }
  async getSearchResults() {
    return this.page.locator(searchResults);
  }

  async clickSignInButton() {
    await this.page.click(signIn);
  }
  async fillCredentials (user, pass) {
    await this.page.locator(login).fill(user);
    await this.page.locator(password).fill(pass);
  }
  async fillNavSearch (query) {
    await this.page.locator(navSearch).fill(query);
  }
  async clickLoginSubmit() {
    await this.page.click(loginSubmit);
  }
}
