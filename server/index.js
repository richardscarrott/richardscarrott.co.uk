'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const debug = require('debug')('app');
const colors = require('colors/safe');
const ghost = require('./middleware/ghost');
const filter = require('./middleware/filter');
const api = require('./routes/api');
const app = express();

app.set('port', process.env.PORT || 6060);

app.use(compression());

app.use('/api', api);

// Mount ghost on the root and filter out any requests which don't contain /ghost/
// to 'disable' the frontend UI. i.e. only allow the admin and ghost api.
// Also allow /content/ for ghost images.
// http://localhost:6060/ghost/api/v0.1/posts/?client_id=ghost-frontend&client_secret=06b9f5556fda
// clientId: "ghost-frontend",
// clientSecret: "4d768870dd95"
app.use(filter(req => /^\/ghost|content\//.test(req.url), ghost({
    config: path.join(__dirname, 'ghost/config.js')
})));

if (process.env.WEBPACK_DEV_SERVER === 'true') {
    app.use(require('./routes/webpack'));
} else {
    app.use(require('./routes/static'));
}

if (process.env.NODE_ENV === 'development') {
    const errorhandler = require('errorhandler');
    errorhandler.title = '¯\\_(ツ)_/¯';
    app.use(errorhandler());
}

app.listen(app.get('port'), () => {
    debug(colors.white(`Server started: http://localhost:${app.get('port')}`));
    debug(colors.grey('Press \'ctrl + c\' to terminate server'));
});
