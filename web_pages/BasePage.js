class BasePage {
  constructor(driver) {
    this.driver = driver;
  }
  async visit(url) {
    await this.driver.get(url);
  }
}
module.exports = BasePage;
