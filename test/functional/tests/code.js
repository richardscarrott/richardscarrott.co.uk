'use strict';

module.exports = {
    tags: ['code', 'smoke'],
    'code'(client) {
        client
            .url(`${client.launchUrl}/code`)
            .pause(1000)
            .waitForElementPresent('[data-automation-id=Code]')
            .assert.title('Code | Richard Scarrott, Frontend Web Developer')
            .end();
    },
    'navigate to blog'(client) {
        client
            .url(`${client.launchUrl}/code`)
            .pause(1000)
            .waitForElementPresent('[data-automation-id=Code]')
            .click('[data-automation-id=BlogLink]')
            .assert.urlEquals(`${client.launchUrl}/`)
            .assert.title('Blog | Richard Scarrott, Frontend Web Developer')
            .waitForElementVisible('[data-automation-id=Page]')
            .end();
    }
};
