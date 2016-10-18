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
    "start_process" : true,
    "server_path": path.join(__dirname, 'lib/selenium-server-standalone-3.0.0.jar'),
    "log_path" : "",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "",
      // "webdriver.gecko.driver" : "/usr/local/bin/geckodriver",
      "webdriver.gecko.driver" : "",
      "webdriver.edge.driver" : ""
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
        "browserName": "firefox",
        "marionette": true
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
