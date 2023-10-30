const { Page } = require('./page.js');

const mainSearch = 'input#search-input';
const searchResults = 'dl#search-results';

class SearchPage extends Page {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async getMainSearch() {
    return super.getElement(mainSearch);
  }
  async getSearchResults() {
    return super.getElement(searchResults);
  }
}

module.exports = { SearchPage };
