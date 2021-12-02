
exports.config = {
    
    restartBrowserBetweenTests: true,
    directConnect: true,
    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    capabilities: {'browserName': 'chrome'},
    SELENIUM_PROMISE_MANAGER: false,
    //baseurl: 'localhost',
    mochaOpts: {
    reporter: 'spec', 
    timeout: 70000
   
  }
  };