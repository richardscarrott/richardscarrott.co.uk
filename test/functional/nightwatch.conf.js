'use strict';

const path = require('path');

module.exports = {
    src_folders: ['test/functional/tests'],
    output_folder: 'test/functional/reports',
    selenium: {
        start_process: !process.env.TRAVIS,
        server_path: path.join(__dirname, 'lib/selenium-server-standalone-3.0.0.jar'),
        cli_args: {
            'webdriver.chromedriver': '/usr/local/bin/chromedriver',
            'webdriver.geckodriver': '/usr/local/bin/geckodriver'
        }
    },
    test_settings: {
        default: {
            launch_url: 'http://localhost:6060',
            desiredCapabilities: {
                browserName: 'chrome'
            },
            globals: {
                waitForConditionTimeout: 2000
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                marionette: true
            }
        },
        browserstack: {
            selenium_port: 80,
            selenium_host: 'hub-cloud.browserstack.com',
            username: 'richardscarrott1',
            access_key: process.env.BROWSERSTACK_ACCESS_KEY,
            desiredCapabilities: {
                build: 'nightwatch-browserstack',
                'browserstack.local': 'true',
                'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
                browserName: 'chrome',
                platform: 'MAC',
                version: '53.0',
                browserName: 'chrome'
            }
        },
        saucelabs: {
            selenium_port: 80,
            selenium_host: 'ondemand.saucelabs.com',
            username: process.env.SAUCE_USERNAME,
            access_key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {
                build: 'nightwatch-sauce-labs',
                'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
                browserName: 'chrome',
                platform: 'OS X 10.11',
                version: '53.0',
                browserName: 'chrome'
            }
        }
    }
};
