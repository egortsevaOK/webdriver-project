const BasePage = require('./BasePage');
const Element = require('../utils/element');
const logger = require('../config/logger.config');
class ProductsPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  async filterBy(value) {
    const checkboxSelector = `//ul[@class='schema-filter__list']//input[@value="${value}"]/..`;
    const checkbox = new Element(this.driver, 'xpath', checkboxSelector, `${value} checkbox`);
    await checkbox.scroll();
    logger.info("Filter products");
    return checkbox.click();
  }
  waitForFilterResults() {
    const counterSelector = '.schema-filter-button__state_control';
    const counter = new Element(this.driver, 'css', counterSelector, 'counter');
    logger.info("Wait for applying filters");
    return counter.waitForElementContainsText('Найдено', 5000);
  };
  viewOffers(model, color) {
    const productsBtnSelector = `//*[contains(@title, "Сравнение предложений на ${model} (${color})")]`;
    const productsButton = new Element(this.driver, 'xpath', productsBtnSelector, `Сравнение предложений на ${model} (${color}) button` );
    logger.info("View offers");
    return productsButton.click();
  }
}
module.exports = ProductsPage;


