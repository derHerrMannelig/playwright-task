const login = 'input#username';
const password = 'input#password';
const loginSubmit = 'input#login-submit';
const flashError = 'div#flash_error';
const flashNotice = 'div#flash_notice';
const lostPassword = 'a.lost_password';
const resetEmail = 'input#mail';
const resetSubmit = 'input[name="commit"]'

export class LoginPage {
  constructor(page){
    this.page = page;
  }

  async getLogin() {
    return this.page.locator(login);
  }
  async getPassword() {
    return this.page.locator(password);
  }
  async getFlashError() {
    return this.page.locator(flashError);
  }
  async getFlashNotice() {
    return this.page.locator(flashNotice);
  }
  async getResetEmail() {
    return this.page.locator(resetEmail);
  }

  async fillCredentials (user, pass) {
    await this.page.locator(login).fill(user);
    await this.page.locator(password).fill(pass);
  }
  async clickLoginSubmit() {
    await this.page.click(loginSubmit);
  }
  async clickLostPasswordButton() {
    await this.page.click(lostPassword);
  }
  async fillReset(email) {
    await this.page.locator(resetEmail).fill(email);
  }
  async clickResetSubmit() {
    await this.page.click(resetSubmit);
  }
}
