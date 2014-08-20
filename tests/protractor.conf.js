exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'acceptance/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  chromeOnly: false,

  baseUrl: 'http://localhost:1337/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
