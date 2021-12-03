const expect = require("chai").expect;
const EC = protractor.ExpectedConditions;
const TIMEOUT = 7000;
describe('Scholastic App', function () {
    beforeEach(function() {
      browser.ignoreSychronization = true;
      return browser.manage().window().maximize();   
    });
    afterEach(function() {
      browser.restart();
    });
  it('should add item to cart', async function () {
      await browser.get('https://shop.scholastic.com/teachers-ecommerce/teacher/tsohomepage.html');
      await browser.waitForAngularEnabled(false);  
      //hover on programm. books and libraries
      await browser.actions().mouseMove(element(by.xpath('//a[@data-element-linkname="h-nav_programs-books-and-libraries"]'))).perform();
      await browser.wait(EC.visibilityOf(element(by.css('.horizontal-dd'))), TIMEOUT);
      //click on "English Learners" from Classrom Libraries
      const englishLearners = await element(by.xpath('//div[@class="horizontal-dd"]//a[@data-element-linkname="h-nav_programs-books-and-libraries_classroom-libraries_english-learners"]'));
      await browser.wait(EC.elementToBeClickable(englishLearners, TIMEOUT));
      await englishLearners.click();
      //click on Filters Grade
      await browser.wait(EC.visibilityOf(element(by.css('.cio-search-filters'))), TIMEOUT);
      await browser.wait(EC.visibilityOf(element(by.xpath("//div[@id='cio-search-facets']//div[contains(text(),'Grade')]"))), TIMEOUT);
      const gradeFilter = await element(by.xpath("//div[@id='cio-search-facets']//div[contains(text(),'Grade')]"));
      await browser.wait(EC.elementToBeClickable(gradeFilter, TIMEOUT));
      await browser.executeScript('arguments[0].click()', gradeFilter);
      await browser.wait(EC.visibilityOf(element(by.css("#cio-search-facets .cio-search-facet-grade.cio-search-facet-open"))));
      const gradeTwelve = await element(by.xpath("//div[@class='leftNav section']//input[@id='grade-grade-12']"));
      await browser.executeScript('arguments[0].click()', gradeTwelve); 
      await browser.wait(EC.elementToBeSelected(gradeTwelve, TIMEOUT));
      //add Ser Maria Book to the cart
      await element(by.css('[title="Pumpkin Circle"] .cio-btn-red.cio-add-to-cart')).click();
      await browser.wait(EC.visibilityOf(element(by.css('.notification-wrapper.shadow'))));
      await element(by.css('[id="add-cart-msg"] .checkoutCartButton')).click();
      await browser.switchTo().frame(await element(by.xpath("//iframe[@src='https://account.scholastic.com/my-scholastic/sign-in.html?ref=tso']")).getWebElement());
      await browser.switchTo().frame(await element(by.id('loginIframe')).getWebElement());
      const continueButton = await element(by.css('button[id="signin-email-submit-button"]'));
      await element(by.id('user-text-field')).sendKeys('new_email@gmail.com');
      await browser.wait(EC.elementToBeClickable(element(by.css('button[id="signin-email-submit-button"]'))), 30000, "Element is not clickable").then(function() {
        browser.executeScript('arguments[0].click()', continueButton);
     });
      await browser.wait(EC.visibilityOf(element(by.css('.EmailField_errorMessage__2Go2g'))));
      const wrongEmailErrorMsg = await element(by.css('.EmailField_errorMessage__2Go2g')).getText();
      expect(wrongEmailErrorMsg).to.include('We don\'t recognize this email address, please try again.');
      browser.switchTo().defaultContent();
      await browser.wait(EC.visibilityOf(element(by.css('img[id=registration-close]'))));
      await element(by.css('img[id=registration-close]')).click();     
      const cartButton = await element(by.css('.col-md-push-1.col-md-1.col-sm-1.col-xs-1.sch-cart-container'));
      await browser.actions().mouseMove(cartButton).perform();
      await element(by.css('.viewCartButton')).click();
      const cartPage = await element(by.id('ShoppingCartPage'));
      await browser.wait(EC.visibilityOf(cartPage), 5000, 'Error: Element is not displayed within 5 seconds');
      const cartBaner = await element(by.xpath('//div[@class="welcomeBannerText text-center complete"]//ancestor::span'));
      expect(await cartBaner.getText()).to.equal("Shopping Cart");    
  });
});