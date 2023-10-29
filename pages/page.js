const signIn = 'a.login';
const register = 'a.register[href="/account/register"]';
const login = 'input#username';
const password = 'input#password';
const loginSubmit = 'input#login-submit';
const registerSubmit = 'input[type=submit]';
const resetSubmit = 'input[name="commit"]'
const loggedAs = 'div#loggedas';
const flashError = 'div#flash_error';
const flashNotice = 'div#flash_notice';
const registerError = 'div#errorExplanation';
const navSearch = 'input#q.small';
const mainSearch = 'input#search-input';
const searchResults = 'dl#search-results';
const asterisks = 'span.required';
const lostPassword = 'a.lost_password';
const resetEmail = 'input#mail';

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
  async getFlashError() {
    return this.page.locator(flashError);
  }
  async getFlashNotice() {
    return this.page.locator(flashNotice);
  }
  async getRegisterError () {
    return this.page.locator(registerError);
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
  async getAsterisks() {
    return this.page.locator(asterisks).all();
  }
  async getResetEmail() {
    return this.page.locator(resetEmail);
  }

  async clickSignInButton() {
    await this.page.click(signIn);
  }
  async clickRegisterButton() {
    await this.page.click(register);
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
  async clickRegisterSubmit() {
    await this.page.click(registerSubmit);
  }
  async clickResetSubmit() {
    await this.page.click(resetSubmit);
  }
  async clickLostPasswordButton() {
    await this.page.click(lostPassword);
  }
  async fillReset(email) {
    await this.page.locator(resetEmail).fill(email);
  }
}