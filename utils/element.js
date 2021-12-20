const {Builder, By, until} = require('selenium-webdriver');
const logger = require('../config/logger.config');

class Element {
  constructor(driver, selectorType, selector, elementName) {
    this.driver = driver;
    this.selectorType = selectorType;
    this.selector = selector;
    this.elementName = elementName;
  }

  find() {
    if (this.selectorType === 'css') {
      this.element = this.driver.findElement(By.css(this.selector));
    } else {
      this.element = this.driver.findElement(By.xpath(this.selector));
    }
    return this.element;
  }
  click() {
    logger.debug(`Clicking "${this.elementName}"`);
    return this.find().click();
  };
  async getText() {
    const elementText = await this.find().getText();
    logger.debug(`"${this.elementName}" element text is ${elementText}`);
    return elementText;
  };
  typeText(text) {
    logger.debug(`"Text ${text}" is entered into${this.elementName}`);
    return this.find().sendKeys(text);
  };
  hoverOn() {
    logger.debug(`Hovering on "${this.elementName}"`);
    return this.driver.actions().move({origin: this.find()}).perform();
  };
  isDisplayed() {
    return this.find().isDisplayed();
  };
  waitUntilLocated(ms) {
    if (this.selectorType === 'css') {
      return this.driver.wait(until.elementLocated(By.css(this.selector)), ms);
    } else {
      return this.driver.wait(until.elementLocated(By.xpath(this.selector)), ms);
    }
  };
  waitForElementContainsText(text, ms) {
    logger.warn(`Waiting "${ms}" milliseconds until "${this.elementName}" contains text "${text}"`);
    return this.driver.wait(until.elementTextContains(this.find(), text), ms);
  };
  waitForVisibility(ms) {
    logger.warn(`Waiting "${ms}" milliseconds`);
    return this.driver.wait(until.elementIsVisible(this.find(), ms));
  };
  scroll() {
    logger.debug(`Scrolling "${this.elementName}"`);
    return this.driver.executeScript('arguments[0].scrollIntoView();', this.find());
  };
  check() {
    logger.debug(`Clicking "${this.elementName}"`);
    return this.driver.executeScript('arguments[0].click()', this.find());
  }
}

module.exports = Element;
