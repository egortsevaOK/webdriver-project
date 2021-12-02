const assert = require('chai').assert;
const {
  expect
} = require('chai');

describe('Scholastic App', function () {
  
    beforeEach(function() {
      browser.ignoreSychronization = true;
      return browser.manage().window().maximize();
    })
  
  it('should add item to cart', async function () {
    try {    
      await browser.get('https://shop.scholastic.com/teachers-ecommerce/teacher/tsohomepage.html');
      await browser.waitForAngularEnabled(false);
      //hover on programm. books and libraries
      await browser.actions().mouseMove(element(by.xpath('//a[@data-element-linkname="h-nav_programs-books-and-libraries"]'))).perform();
      await browser.wait(ExpectedConditions.visibilityOf(element(by.css('.horizontal-dd'))), 6000);
      //click on "English Learners" from Classrom Libraries
      await element(by.xpath('//div[@class="horizontal-dd"]//a[@data-element-linkname="h-nav_programs-books-and-libraries_classroom-libraries_english-learners"]')).click();
      await browser.sleep(3000);
      //click on Filters Grade
      await element(by.xpath("//div[@id='cio-search-facets']//div[contains(text(),'Grade')]")).click();     
      await browser.sleep(1000);
      //click on Grade 12 checkbox
      const gradeTwelve = await element(by.xpath("//div[@class='leftNav section']//input[@id='grade-grade-12']"));
      await browser.executeScript('arguments[0].click()', gradeTwelve);
      await browser.sleep(1000); 
      const resultsElement = await element(by.css('.cio-num-results'));
      await browser.wait(ExpectedConditions.textToBePresentInElement(resultsElement, '19 Results', 5000));
      //add Ser Maria Book to the cart
      await element(by.css('[title="Pumpkin Circle"] .cio-btn-red.cio-add-to-cart')).click();
      await browser.sleep(1000);
      await browser.wait(ExpectedConditions.visibilityOf(element(by.css('.notification-wrapper.shadow'))), 7000);
      await browser.sleep(1000);
      await element(by.css('[id="add-cart-msg"] .checkoutCartButton')).click();
      await browser.sleep(1000);
      await browser.switchTo().frame(await element(by.xpath("//iframe[@src='https://account.scholastic.com/my-scholastic/sign-in.html?ref=tso']")).getWebElement());
      await browser.switchTo().frame(await element(by.id('loginIframe')).getWebElement());
      const continueButton = await element(by.css('button[id="signin-email-submit-button"]'));
      await element(by.id('user-text-field')).sendKeys('new_email@gmail.com');
      browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('button[id="signin-email-submit-button"]'))), 30000, "Element is not clickable").then(function() {
        browser.executeScript('arguments[0].click()', continueButton);
     });
      await browser.sleep(2000);
      const wrongEmailErrorMsg = await element(by.css('.EmailField_errorMessage__2Go2g')).getText();
      expect(wrongEmailErrorMsg).to.include('We don\'t recognize this email address, please try again.');
      await browser.sleep(1000);
      browser.switchTo().defaultContent();
      await element(by.css('img[id=registration-close]')).click();     
      const cartButton = await element(by.css('.col-md-push-1.col-md-1.col-sm-1.col-xs-1.sch-cart-container'));
      await browser.actions().mouseMove(cartButton).perform();
      await element(by.css('.viewCartButton')).click();
      const cartPage = await element(by.id('ShoppingCartPage'));
      await browser.sleep(2000);
      browser.wait(protractor.until.elementIsVisible(cartPage), 5000, 'Error: Element is not displayed within 5 seconds');
      await browser.sleep(10000);
      const cartBaner = await element(by.xpath('//div[@class="welcomeBannerText text-center complete"]//ancestor::span'));
      expect(await cartBaner.getText()).to.equal("Shopping Cart");    
    } catch (err) {
      console.log(err);
    }
  });

});