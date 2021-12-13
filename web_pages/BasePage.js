class BasePage {
  constructor(driver) {
    this.driver = driver;
  }
  visit(url) {
    return this.driver.get(url);
  }
}
module.exports = BasePage;
