'use strict';

const generateConfig = require('./generateConfig');

module.exports = generateConfig({
    test: true,
    // debug: true,
    staticFileNames: true,
    staticClassNames: true
});
