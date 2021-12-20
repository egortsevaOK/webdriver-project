const BasePage = require('./BasePage');
const Element = require('../utils/element');
const logger = require('../config/logger.config');
class CatalogPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  async load() {
    logger.info("Open catalog page");
    await this.visit('https://catalog.onliner.by/');
  }
  selectCategory(categoryToClick) {
    const categorySelector = `//span[contains(text(), "${categoryToClick}")]`;
    const category = new Element(this.driver, 'xpath', categorySelector, `${categoryToClick} category`);
    logger.info("Select category from navigation list");
    return category.click();
  }
  selectSubCategory(itemToHover ) {
    const subcategorySelector = `//div[text()=" ${itemToHover} "]`;
    const subcategory = new Element(this.driver, 'xpath', subcategorySelector,`${itemToHover} subcategory`);
    logger.info("Select subcategory from dropdown");
    return subcategory.hoverOn();
  }
  selectProducts(productsToClick) {
    const ProductsSelector = `//*[contains(@class,'catalog-navigation-list__aside-item_active')]//span[contains(text(), "${productsToClick}")]`;
    const products = new Element(this.driver, 'xpath', ProductsSelector, `${productsToClick} product type`);
    logger.info("Select product type");
    return products.click();
  }
}
module.exports = CatalogPage;
