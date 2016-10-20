'use strict';

// `expect` syntax isn't as nice as `assert`
// however, `assert` doesn't support negation...

// TODO:
//   - See if we can do something nice for data-automation-id names in src/
//   - Try out Page Object Model to avoid duplicating selectors...

module.exports = {
    tags: ['blog', 'smoke'],
    'blog'(client) {
        client
            .url(client.launchUrl)
            .pause(1000) // Allow js to download...
            .waitForElementPresent('[data-automation-id=Page]')
            .assert.title('Blog | Richard Scarrott, Frontend Web Developer')
            .end();
    },
    'pagination'(client) {
        client
            .url(client.launchUrl)
            .pause(1000)
            .waitForElementPresent('[data-automation-id=Page]')
            .click('[data-automation-id="OlderPosts"]')
            .assert.urlEquals(`${client.launchUrl}/blog/page/2`)
            .waitForElementVisible('[data-automation-id=PostTitle0]')
            .assert.containsText('[data-automation-id=PostTitle0]', 'Post 2')
            .end();
    },
    'blog post'(client) {
        client
            .url(client.launchUrl)
            .pause(1000)
            .waitForElementPresent('[data-automation-id=Page]');

        // Have to break out into chai style for negations... :(
        client.expect.element('[data-automation-id=Page]')
            .text.not.to.contain('Have fun - and let us know what you think :)');

        client
            .click('[data-automation-id=PostTitle0]')
            .assert.visible('[data-automation-id=Post]')
            .assert.containsText('[data-automation-id=Post]', 'Have fun - and let us know what you think :)')
            .end();

        client.end();
    },
    'navigate to code'(client) {
        client
            .url(client.launchUrl)
            .pause(1000)
            .waitForElementPresent('[data-automation-id=Page]')
            .click('[data-automation-id=CodeLink]')
            .assert.urlEquals(`${client.launchUrl}/code`)
            .assert.title('Code | Richard Scarrott, Frontend Web Developer')
            .waitForElementVisible('[data-automation-id=Code]')
            .end();
    }
};
