// An example configuration file.
exports.config = {
  chromeOnly: true,
  chromeDriver: './node_modules/protractor/selenium/chromedriver',

  // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  baseUrl: 'http://localhost:9000/',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*_spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
