import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import Helmet from 'react-helmet';
import App from './components/app/App';
import Page from './components/blog/page/Page';
import Post from './components/blog/post/Post';
import Code from './components/code/Code';
import KitchenSink from './components/kitchensink/KitchenSink'; // TODO: conditionally require this (maybe do it via webpack config rather than using commonJs)
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={process.env.BLOG_ENABLED ? Page : Code} />
        {process.env.BLOG_ENABLED ? (
            <Route path="blog">
                <IndexRedirect to="/" />
                <Redirect path="page/1" to="/" />
                <Route path="page/:pageNumber" component={Page} />
                <Route path="post/:slug" component={Post} />
            </Route>
        ) : null}
        <Route path="code" component={Code}>
            {process.env.BLOG_ENABLED ? null : (
                <IndexRedirect to="/" />
            )}
        </Route>
        {process.env.CLIENT_ENV !== 'production' ? (
            <Route path="kitchen-sink" component={KitchenSink} />
        ) : null}
        <Route path="*" component={NotFound} />
    </Route>
);

export { NotFound as NotFoundComponent };
