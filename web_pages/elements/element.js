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
    return this;
  }
  click() {
    return this.element.click();
  };
  getText() {
    return this.element.getText();
  };
  typeText(text) {
    return this.element.sendKeys(text);
  };
  hoverOn() {
    return this.driver.actions().move({origin: this.element}).perform();
  };
  isDisplayed() {
    return this.element.isDisplayed();
  };
  waitUntilLocated(waitInMilliseconds) {
    if (this.selectorType === 'css') {
      return this.driver.wait(until.elementLocated(By.css(this.selector)), waitInMilliseconds);
    } else {
      return this.driver.wait(until.elementLocated(By.xpath(this.selector)), waitInMilliseconds);
    }
  };
  waitForElementContainsText(text, waitInMilliseconds) {
    return this.driver.wait(until.elementTextContains(this.element, text), waitInMilliseconds);
  };
  waitForVisibility(waitInMilliseconds) {
    return this.driver.wait(until.elementIsVisible(this.element, waitInMilliseconds));
  };
  scroll() {
    return this.driver.executeScript('arguments[0].scrollIntoView();', this.element);
  };
  check() {
    return this.driver.executeScript('arguments[0].click()', this.element);
  }
}

module.exports = Element;
