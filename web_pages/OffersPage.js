const BasePage = require('./BasePage');
const Element = require('../utils/element');
class OffersPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  confirmCityPopUp() {
    const cityPopupSelector = '.offers-list__target';
    const cityPopup = new Element(this.driver, 'css', cityPopupSelector);
    return cityPopup.scroll();
  }
  async clickYesButton() {
    const confirmButtonSelector = '//span[contains(text(), "верно")]';
    const confirmButton = new Element(this.driver, 'xpath', confirmButtonSelector);
    confirmButton.waitForVisibility(5000);
    await confirmButton.scroll();
    return confirmButton.check();
  }
  async buyNow() {
    const buttonBuySelector = '.offers-list__item:first-child .offers-list__control.offers-list__control_default.helpers_hide_tablet [href]';
    const buttonBuy = new Element(this.driver, 'css', buttonBuySelector);
    await buttonBuy.waitUntilLocated(5000);
    await buttonBuy.waitForVisibility(5000);
    await buttonBuy.scroll();
    return buttonBuy.click();
  }
}
module.exports = OffersPage;


