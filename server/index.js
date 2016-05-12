'use strict';

const config = require('./config');
const path = require('path');
const express = require('express');
const ms = require('ms');
const compression = require('compression');
const fs = require('fs');
const debug = require('debug')('app');
const colors = require('colors/safe');
const ghost = require('./middleware/ghost');
const filter = require('./middleware/filter');
const api = require('./routes/api');
const app = express();

app.set('port', config.PORT || 6060);

app.use(compression());

app.use('/api', api);

// Mount ghost on the root and filter out any requests which don't contain /ghost/
// to 'disable' the frontend UI. i.e. only allow the admin and ghost api.
// http://localhost:6060/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=06b9f5556fda
// clientId: "ghost-frontend",
// clientSecret: "4d768870dd95"
app.use(filter(req => /^\/ghost\//.test(req.url), ghost({
    config: path.join(__dirname, 'ghost/config.js')
})));

if (config.WEBPACK_DEV_SERVER === 'true') {
    app.use(require('./routes/webpack'));
} else {
    app.use(require('./routes/static'));
}

app.listen(app.get('port'), () => {
    debug(`Server started: http://localhost:${app.get('port')}`);
    debug(colors.grey('Press \'ctrl + c\' to terminate server'));
});
