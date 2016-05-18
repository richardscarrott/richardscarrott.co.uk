import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Helmet from 'react-helmet';
import App from './components/app/App';
import Page from './components/blog/page/Page';
import Post from './components/blog/post/Post';
import Code from './components/code/Code';
import KitchenSink from './components/kitchensink/KitchenSink'; // TODO: conditionally require this (maybe do it via webpack config rather than using commonJs)
import NotFound from './components/NotFound';

// <Redirect from="/*" to="/*/" />

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Page} />
        <Redirect path="page/1" to="/" />
        <Route path="page/:pageNumber" component={Page} />
        <Route path="post/:slug" component={Post} />
        <Route path="code" component={Code} />
        {process.env.CLIENT_ENV !== 'production' ? (
            <Route path="kitchen-sink" component={KitchenSink} />
        ) : null}
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
