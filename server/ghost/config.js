'use strict';

// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

const path = require('path');

// Allow ghost config to be toggled via `process.env.GHOST_ENV` rather than the
// overloaded `NODE_ENV`.
const env = process.env.GHOST_ENV;

let config;

switch (env) {
    case 'production':
        config = {
            url: 'http://richardscarrott.co.uk',
            mail: {},
            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(__dirname, '/content/data/ghost.db')
                },
                debug: false
            },
            server: {
                host: '0.0.0.0',
                port: process.env.PORT
            },
            paths: {
                contentPath: path.join(__dirname, '/content/')
            }
        };
    break;
    case 'test':
        config = {
            url: `http://localhost:${process.env.PORT}`,
            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(__dirname, '/content/data/ghost-test.db')
                },
                debug: false
            },
            server: {
                host: '127.0.0.1',
                port: process.env.PORT
            },
            paths: {
                contentPath: path.join(__dirname, '/content/')
            }
        };
    break;
    default:
        // development
        config = {
            // The url to use when providing links to the site, E.g. in RSS and email.
            // Change this to your Ghost blog's published URL.
            url: `http://localhost:${process.env.PORT}`,
            // #### Database
            // Ghost supports sqlite3 (default), MySQL & PostgreSQL
            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(__dirname, '/content/data/ghost-dev.db')
                },
                debug: false
            },
            // #### Server
            // Can be host & port (default), or socket
            server: {
                // Host to be passed to node's `net.Server#listen()`
                host: '127.0.0.1',
                // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
                port: process.env.PORT
            },
            // #### Paths
            // Specify where your content directory lives
            paths: {
                contentPath: path.join(__dirname, '/content/')
            }
        };
    break;
}

module.exports = {
    [process.env.NODE_ENV]: config
};
