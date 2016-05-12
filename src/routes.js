import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Helmet from 'react-helmet';
import App from './containers/App';
import Blog from './components/blog/Blog';
import Code from './components/code/Code';
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Blog} />
        <Redirect path="page/1" to="/" />
        <Route path="page/:pageNumber" component={Blog} />
        <Route path="code" component={Code} />
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
