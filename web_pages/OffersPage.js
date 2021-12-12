const BasePage = require('./BasePage');
const Element = require('./elements/Element');
class OffersPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  confirmCityPopUp() {
    const cityPopupSelector = '.offers-list__target';
    const cityPopup = new Element(this.driver, 'css', cityPopupSelector);
    return cityPopup.find().scroll();
  }
  clickYesButton() {
    const confirmButtonSelector = '//span[contains(text(), "верно")]';
    const confirmButton = new Element(this.driver, 'xpath', confirmButtonSelector);
    confirmButton.find().waitForVisibility(5000);
    confirmButton.find().scroll();
    return confirmButton.find().check();
  }
  buyNow() {
    const buttonBuySelector = '.offers-list__item:first-child .offers-list__control.offers-list__control_default.helpers_hide_tablet [href]';
    const buttonBuy = new Element(this.driver, 'css', buttonBuySelector);
    buttonBuy.find().waitUntilLocated(5000);
    buttonBuy.find().waitForVisibility(5000);
    buttonBuy.find().scroll();
    return buttonBuy.find().click();
  }
}
module.exports = OffersPage;


