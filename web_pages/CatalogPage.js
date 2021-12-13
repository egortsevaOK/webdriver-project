const BasePage = require('./BasePage');
const Element = require('../utils/element');
class CatalogPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  async load() {
    await this.visit('https://catalog.onliner.by/');
  }
  selectCategory(categoryToClick) {
    const categorySelector = `//span[contains(text(), "${categoryToClick}")]`;
    const category = new Element(this.driver, 'xpath', categorySelector);
    return category.click();
  }
  selectSubCategory(itemToHover ) {
    const subcategorySelector = `//div[text()=" ${itemToHover} "]`;
    const subcategory = new Element(this.driver, 'xpath', subcategorySelector);
    return subcategory.hoverOn();
  }
  selectProducts(productsToClick) {
    const ProductsSelector = `//*[contains(@class,'catalog-navigation-list__aside-item_active')]//span[contains(text(), "${productsToClick}")]`;
    const products = new Element(this.driver, 'xpath', ProductsSelector);
    return products.click();
  }
}
module.exports = CatalogPage;
