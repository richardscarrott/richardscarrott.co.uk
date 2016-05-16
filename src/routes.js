import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Helmet from 'react-helmet';
import App from './components/app/App';
import Blog from './components/blog/Blog';
import Code from './components/code/Code';
import KitchenSink from './components/kitchensink/KitchenSink'; // TODO: conditionally require this (maybe do it via webpack config rather than using commonJs)
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Blog} />
        <Redirect path="page/1" to="/" />
        <Route path="page/:pageNumber" component={Blog} />
        <Route path="code" component={Code} />
        {process.env.CLIENT_ENV !== 'production' ? (
            <Route path="kitchen-sink" component={KitchenSink} />
        ) : null}
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
