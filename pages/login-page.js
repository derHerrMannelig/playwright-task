const { Page } = require('./page.js');

const login = 'input#username';
const password = 'input#password';
const loginSubmit = 'input#login-submit';
const flashError = 'div#flash_error';
const flashNotice = 'div#flash_notice';
const lostPassword = 'a.lost_password';
const resetEmail = 'input#mail';
const resetSubmit = 'input[name="commit"]'

class LoginPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async getLogin() {
    return super.getElement(login);
  }
  async getPassword() {
    return super.getElement(password);
  }
  async getFlashError() {
    return super.getElement(flashError);
  }
  async getFlashNotice() {
    return super.getElement(flashNotice);
  }
  async getResetEmail() {
    return super.getElement(resetEmail);
  }

  async fillCredentials (user, pass) {
    await (await super.getElement(login)).fill(user);
    await (await super.getElement(password)).fill(pass);
  }
  async clickLoginSubmit() {
    await super.clickElement(loginSubmit);
  }
  async clickLostPasswordButton() {
    await super.clickElement(lostPassword);
  }
  async fillReset(email) {
    await (await super.getElement(resetEmail)).fill(email);
  }
  async clickResetSubmit() {
    await super.clickElement(resetSubmit);
  }
}

module.exports = { LoginPage };
