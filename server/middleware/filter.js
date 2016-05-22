'use strict';

function filter(filterFn, middleware) {
    return (req, res, next) => filterFn(req)
        ? (
            setTimeout(() => {
                middleware(req, res, next)
            }, 5000)
        ) : next();
}

module.exports = filter;
