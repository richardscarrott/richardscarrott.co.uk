'use strict';

// http://rogerstringer.com/2015/09/07/ghost-express-middleware/

const ghost = require('ghost');
const debug = require('debug')('ghost-middleware');

function processBuffer(buffer, app) {
    while (buffer.length) {
        const request = buffer.pop();
        debug(`Buffered request processed ${request.req.url}`);
        app(request.req, request.res, request.next);
    }
}

function ghostMiddleware(options) {
    debug('Using ghost middleware');

    let requestBuffer = [];
    let app;

    ghost(options)
        .then(ghost => {
            debug('Ghost ready');
            app = ghost.rootApp;
            processBuffer(requestBuffer, app);
            requestBuffer = null;
        })
        .catch(err => {
            throw err;
        });

    return (req, res, next) => {
        debug(`Request received ${req.url}`);
        if (!app) {
            debug(`Request buffered ${req.url}`);
            requestBuffer.unshift({
                req,
                res,
                next
            });
        } else {
            debug(`Request processed ${req.url}`);
            app(req, res, next);
        }
    }
}

module.exports = ghostMiddleware;
