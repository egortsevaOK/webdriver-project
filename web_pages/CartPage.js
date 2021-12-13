const BasePage = require('./BasePage');
const Element = require('../utils/element');
class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.cartTitleSelector ='.cart-form__title_extended-alter';
  }
  showTitle() {
    const cartTitle = new Element(this.driver, 'css', this.cartTitleSelector);
    return cartTitle.waitUntilLocated(5000);
  }
  async getCartText() {
    const cartTitle = new Element(this.driver, 'css', this.cartTitleSelector);
    await cartTitle.waitUntilLocated(5000);
    return cartTitle.getText();
  }
}
module.exports = CartPage;


