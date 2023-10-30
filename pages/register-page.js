const registerLogin = 'input#user_login';
const registerPassword = 'input#user_password';
const registerConfirmation = 'input#user_password_confirmation';
const registerFirstName = 'input#user_firstname';
const registerLastName = 'input#user_lastname';
const registerEmail ='input#user_mail';
const asterisks = 'span.required';
const registerSubmit = 'input[type=submit]';
const registerError = 'div#errorExplanation';

export class RegisterPage {
  constructor(page){
    this.page = page;
  }

  async getRegisterLogin() {
    return this.page.locator(registerLogin);
  }
  async getRegisterPassword() {
    return this.page.locator(registerPassword);
  }
  async getRegisterConfirmation() {
    return this.page.locator(registerConfirmation);
  }
  async getRegisterFirstName() {
    return this.page.locator(registerFirstName);
  }
  async getRegisterLastName() {
    return this.page.locator(registerLastName);
  }
  async getRegisterEmail() {
    return this.page.locator(registerEmail);
  }
  async getAsterisks() {
    return this.page.locator(asterisks).all();
  }
  async getRegisterError () {
    return this.page.locator(registerError);
  }

  async fillRegistrationForm(login, pass, name, surname, mail) {
    await this.page.locator(registerLogin).fill(login);
    await this.page.locator(registerPassword).fill(pass);
    await this.page.locator(registerConfirmation).fill(pass);
    await this.page.locator(registerFirstName).fill(name);
    await this.page.locator(registerLastName).fill(surname);
    await this.page.locator(registerEmail).fill(mail);
  }
  async clickRegisterSubmit() {
    await this.page.click(registerSubmit);
  }
}
