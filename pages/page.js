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
const registerLogin = 'input#user_login';
const registerPassword = 'input#user_password';
const registerConfirmation = 'input#user_password_confirmation';
const registerFirstName = 'input#user_firstname';
const registerLastName = 'input#user_lastname';
const registerEmail ='input#user_mail';

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
  async fillRegistrationForm(login, pass, name, surname, mail) {
    await this.page.locator(registerLogin).fill(login);
    await this.page.locator(registerPassword).fill(pass);
    await this.page.locator(registerConfirmation).fill(pass);
    await this.page.locator(registerFirstName).fill(name);
    await this.page.locator(registerLastName).fill(surname);
    await this.page.locator(registerEmail).fill(mail);
  }
}
