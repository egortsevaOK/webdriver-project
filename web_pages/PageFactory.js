const BasePage = require('./BasePage');
const CatalogPage = require('./CatalogPage');
const ProductsPage = require('./ProductsPage');
const OffersPage = require('./OffersPage');
const CartPage = require('./CartPage');
class PageFactory {
  constructor(driver) {
    this.driver = driver;
  }
  getPage(pageName) {
    switch (pageName) {
      case 'Catalog':
        return new CatalogPage(this.driver);
      case 'Products':
        return new ProductsPage(this.driver);
      case 'Offers':
        return new OffersPage(this.driver);
      case 'Cart':
        return new CartPage(this.driver);
      default:
        return new BasePage(this.driver);
    };
  };
};
module.exports = PageFactory;
