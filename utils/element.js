const {Builder, By, until} = require('selenium-webdriver');

class Element {
  constructor(driver, selectorType, selector) {
    this.driver = driver;
    this.selectorType = selectorType;
    this.selector = selector;
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
    return this.find().click();
  };
  getText() {
    return this.find().getText();
  };
  typeText(text) {
    return this.find().sendKeys(text);
  };
  hoverOn() {
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
    return this.driver.wait(until.elementTextContains(this.find(), text), ms);
  };
  waitForVisibility(ms) {
    return this.driver.wait(until.elementIsVisible(this.find(), ms));
  };
  scroll() {
    return this.driver.executeScript('arguments[0].scrollIntoView();', this.find());
  };
  check() {
    return this.driver.executeScript('arguments[0].click()', this.find());
  }
}

module.exports = Element;
