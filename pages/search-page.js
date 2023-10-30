const mainSearch = 'input#search-input';
const searchResults = 'dl#search-results';

export class SearchPage {
  constructor(page){
    this.page = page;
  }

  async getMainSearch() {
    return this.page.locator(mainSearch);
  }
  async getSearchResults() {
    return this.page.locator(searchResults);
  }
}
