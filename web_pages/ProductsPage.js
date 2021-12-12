const BasePage = require('./BasePage');
const Element = require('./elements/Element');
class ProductsPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  filterBy(value) {
    const checkboxSelector = `//ul[@class='schema-filter__list']//input[@value="${value}"]/..`;
    const checkbox = new Element(this.driver, 'xpath', checkboxSelector);
    checkbox.find().scroll();
    return checkbox.find().click();
  }
  waitForFilterResults() {
    const counterSelector = '.schema-filter-button__state_control';
    const counter = new Element(this.driver, 'css', counterSelector);
    return counter.find().waitForElementContainsText('Найдено', 5000);
  };
  viewOffers(model, color) {
    const productsBtnSelector = `//*[contains(@title, "Сравнение предложений на ${model} (${color})")]`;
    const productsButton = new Element(this.driver, 'xpath', productsBtnSelector);
    return productsButton.find().click();
  }
}
module.exports = ProductsPage;


