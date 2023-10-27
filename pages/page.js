const signIn = 'a.login';
const login = 'input#username';
const password = 'input#password';
const loginSubmit = 'input#login-submit';
const loggedAs = 'div#loggedas';
const testData = JSON.parse(JSON.stringify(require('../data/test-data.json')));

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

  async clickSignInButton() {
    await this.page.click(signIn);
  }
  async fillCredentials () {
    await this.page.locator(login).fill(testData.user.username);
    await this.page.locator(password).fill(testData.user.password);
  }
  async clickLoginSubmit() {
    await this.page.click(loginSubmit);
  }
}
