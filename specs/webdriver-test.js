const {Builder, Capabilities} = require('selenium-webdriver');
const PageFactory = require('../web_pages/PageFactory');
const {expect} = require('chai');

describe('Onliner catalog tests', async function() {
  this.timeout(30000);
  let driver;
  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });
  afterEach(async () => {
    await driver.quit();
  });
  it('should open order form', async function() {
    const pageFactory = new PageFactory(driver);
    await pageFactory.getPage('Catalog').load();
    await pageFactory.getPage('Catalog').selectCategory('Бытовая техника');
    await pageFactory.getPage('Catalog').selectSubCategory('Уборка');
    await pageFactory.getPage('Catalog').selectProducts('Роботы-пылесосы');
    await pageFactory.getPage('Products').filterBy('floor');
    await pageFactory.getPage('Products').filterBy('roborock');
    await pageFactory.getPage('Products').waitForFilterResults();
    await pageFactory.getPage('Products').viewOffers('Roborock S7', 'черный');
    await pageFactory.getPage('Offers').confirmCityPopUp();
    await pageFactory.getPage('Offers').clickYesButton();
    await pageFactory.getPage('Offers').buyNow();
    await pageFactory.getPage('Cart').showTitle();
    const cartTitle = await pageFactory.getPage('Cart').getCartText();
    expect(cartTitle).to.include('Оформление заказа');
  });
});
