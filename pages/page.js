const signIn = 'a.login';
const login = 'input#username';
const password = 'input#password';
const loginSubmit = 'input#login-submit';
const loggedAs = 'div#loggedas';
const loginError = 'div#flash_error'

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

  async clickSignInButton() {
    await this.page.click(signIn);
  }
  async fillCredentials (user, pass) {
    await this.page.locator(login).fill(user);
    await this.page.locator(password).fill(pass);
  }
  async clickLoginSubmit() {
    await this.page.click(loginSubmit);
  }
}
