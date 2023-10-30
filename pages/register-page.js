const { Page } = require('./page.js');

const registerLogin = 'input#user_login';
const registerPassword = 'input#user_password';
const registerConfirmation = 'input#user_password_confirmation';
const registerFirstName = 'input#user_firstname';
const registerLastName = 'input#user_lastname';
const registerEmail ='input#user_mail';
const asterisks = 'span.required';
const registerSubmit = 'input[type=submit]';
const registerError = 'div#errorExplanation';

class RegisterPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async getRegisterLogin() {
    return super.getElement(registerLogin);
  }
  async getRegisterPassword() {
    return super.getElement(registerPassword);
  }
  async getRegisterConfirmation() {
    return super.getElement(registerConfirmation);
  }
  async getRegisterFirstName() {
    return super.getElement(registerFirstName);
  }
  async getRegisterLastName() {
    return super.getElement(registerLastName);
  }
  async getRegisterEmail() {
    return super.getElement(registerEmail);
  }
  async getAsterisks() {
    return (await super.getElement(asterisks)).all();
  }
  async getRegisterError () {
    return super.getElement(registerError);
  }

  async fillRegistrationForm(login, pass, name, surname, mail) {
    await (await super.getElement(registerLogin)).fill(login);
    await (await super.getElement(registerPassword)).fill(pass);
    await (await super.getElement(registerConfirmation)).fill(pass);
    await (await super.getElement(registerFirstName)).fill(name);
    await (await super.getElement(registerLastName)).fill(surname);
    await (await super.getElement(registerEmail)).fill(mail);
  }
  async clickRegisterSubmit() {
    await super.clickElement(registerSubmit);
  }
}

module.exports = { RegisterPage };
