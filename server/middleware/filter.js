'use strict';

function filter(filterFn, middleware) {
    return (req, res, next) => filterFn(req)
        ? middleware(req, res, next) : next();
}

module.exports = filter;
