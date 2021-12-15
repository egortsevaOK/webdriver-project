const logger = require('../config/logger.config');
class BasePage {
  constructor(driver) {
    this.driver = driver;
  }
  visit(url) {
    logger.debug(`Opening "${url}" url`);
    return this.driver.get(url);
  }
}
module.exports = BasePage;
