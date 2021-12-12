const BasePage = require('./BasePage');
const Element = require('./elements/Element');
class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  showTitle() {
    const cartTitleSelector = '.cart-form__title_extended-alter';
    const cartTitle = new Element(this.driver, 'css', cartTitleSelector);
    return cartTitle.find().waitUntilLocated(5000);
  }
  getCartText() {
    const cartTitleSelector = '.cart-form__title_extended-alter';
    const cartTitle = new Element(this.driver, 'css', cartTitleSelector);
    cartTitle.find().waitUntilLocated(5000);
    return cartTitle.getText();
  }
}
module.exports = CartPage;


