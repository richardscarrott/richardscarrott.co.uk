'use strict';

const path = require('path');
const geckodriver = require('geckodriver');

module.exports = {
  "src_folders" : ["test/functional"],
  "output_folder" : "reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "globals_path" : "",

  "selenium" : {
    "start_process" : false,
    // "server_path": path.join(__dirname, 'lib/selenium-server-standalone-2.53.1.jar'),
    // "server_path": path.join(__dirname, 'lib/selenium-server-standalone-3.0.0.jar'),
    // "host": "hub-cloud.browserstack.com",
    // "port": 80,
    // "log_path" : "",
    // "port" : 4444,
    // 'selenium_port': 80,
    // 'selenium_host': 'hub.browserstack.com',

    // http://USERNAME:ACCESS_KEY@hub-cloud.browserstack.com/wd/hub
    "cli_args" : {
      "debug": true,
      // "webdriver.chrome.driver" : "",
      // "webdriver.gecko.driver" : "/usr/local/bin/geckodriver",
      // "webdriver.gecko.driver" : "",
      // "webdriver.edge.driver" : ""
      // "webdriver.chrome.driver" : "/usr/local/bin/chromedriver",
      // // "webdriver.gecko.driver" : "/usr/local/bin/geckodriver",
      // "webdriver.gecko.driver" : geckodriver.path,
      // "webdriver.edge.driver" : ""
    }
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost:6060",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        // 'build': 'nightwatch-browserstack',
        // 'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
        // 'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
        'browserstack.debug': true,
        'browser': 'chrome',
        'selenium_port': 80,
        'selenium_host': 'hub.browserstack.com',

        'browserstack.local': 'true',
        'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER

        // browserName: 'Safari',
        // browser_version: '8.0',
        // os: 'OS X',
        // os_version: 'Yosemite',
        // resolution: '1024x768',
        // 'browserstack.local': 'true',
        // 'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
        // build: process.env.BS_AUTOMATE_BUILD,
        // project: process.env.BS_AUTOMATE_PROJECT,
        // 'browserstack.user': process.env.BROWSERSTACK_USERNAME,
        // 'browserstack.key': process.env.BROWSERSTACK_KEY
        // "browserName": "firefox",
        // "marionette": true
      },
      "globals": {
        "waitForConditionTimeout": 2000
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
}
