'use strict';

const path = require('path');
const geckodriver = require('geckodriver');

module.exports = {
  "src_folders" : ["test/functional"],
  "output_folder" : "reports",

  "selenium" : {
    "start_process" : false,
    "server_path": path.join(__dirname, 'lib/selenium-server-standalone-3.0.0.jar'),
    "cli_args" : {
      "webdriver.chrome.driver" : "/usr/local/bin/chromedriver",
      "webdriver.gecko.driver" : "/usr/local/bin/geckodriver",
      // "webdriver.gecko.driver" : geckodriver.path,
    }
  },

  "test_settings" : {
    "default": {
      "launch_url": "http://localhost:6060",
      "desiredCapabilities": {
        "browserName": "firefox",
        "marionette": true
      },
      "globals": {
        "waitForConditionTimeout": 2000
      }
    },

    "saucelabs" : {
      'selenium_port': 80,
      'selenium_host': 'ondemand.saucelabs.com',
      "username" : process.env.SAUCE_USERNAME,
      "access_key" : process.env.SAUCE_ACCESS_KEY,
      "desiredCapabilities": {
        'build': 'nightwatch-sauce-labs',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'browserName': 'chrome'
      }
    },

    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    },

    "edge" : {
      "desiredCapabilities": {
        "browserName": "MicrosoftEdge"
      }
    }
  }
};
