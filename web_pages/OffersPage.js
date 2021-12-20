const BasePage = require('./BasePage');
const Element = require('../utils/element');
const logger = require('../config/logger.config');
class OffersPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  confirmCityPopUp() {
    const cityPopupSelector = '.offers-list__target';
    const cityPopup = new Element(this.driver, 'css', cityPopupSelector, 'Confirm City Pop Up');
    logger.info("Scroll down page");
    return cityPopup.scroll();
  }
  async clickYesButton() {
    const confirmButtonSelector = '//span[contains(text(), "верно")]';
    const confirmButton = new Element(this.driver, 'xpath', confirmButtonSelector, 'Confirm Button');
    confirmButton.waitForVisibility(5000);
    await confirmButton.scroll();
    logger.info("Confirm Minsk city");
    return confirmButton.check();
  }
  async buyNow() {
    const buttonBuySelector = '.offers-list__item:first-child .offers-list__control.offers-list__control_default.helpers_hide_tablet [href]';
    const buttonBuy = new Element(this.driver, 'css', buttonBuySelector, 'Buy Now Button');
    await buttonBuy.waitUntilLocated(5000);
    await buttonBuy.waitForVisibility(5000);
    await buttonBuy.scroll();
    logger.info("Click on buy now button");
    return buttonBuy.click();
  }
}
module.exports = OffersPage;


