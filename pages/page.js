class Page {
  constructor(page) {
    this.page = page;
  }

  async openUrl(url) {
    await this.page.goto(url == undefined ? '' : url);
    await this.page.waitForLoadState('load');
  }

  async getElement(element) {
    return this.page.locator(element);
  }

  async clickElement(element) {
    await (await this.getElement(element)).click();
  }
}

module.exports = { Page };
