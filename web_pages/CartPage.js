const BasePage = require('./BasePage');
const Element = require('../utils/element');
const logger = require('../config/logger.config');
class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.cartTitleSelector ='.cart-form__title_extended-alter';
    this.cartName = 'Cart Title';
  }
  showTitle() {
    const cartTitle = new Element(this.driver, 'css', this.cartTitleSelector, this.cartName);
    return cartTitle.waitUntilLocated(5000);
  }
  async getCartText() {
    const cartTitle = new Element(this.driver, 'css', this.cartTitleSelector, this.cartName);
    await cartTitle.waitUntilLocated(5000);
    logger.info("Get Cart Banner Text");
    return cartTitle.getText();
  }
}
module.exports = CartPage;


