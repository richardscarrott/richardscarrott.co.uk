import React, { PropTypes } from 'react';

function Html({css, js, html, head, initialState}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge,chrome=1" />
                {head.title.toComponent()}
                {head.meta.toComponent()}
                <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="msapplication-tap-highlight" content="no" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                {head.link.toComponent()}
                {css ? (
                    <link rel="stylesheet" href={css} />
                ) : null}
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{
                    __html: html
                }} />
                {process.env.CLIENT_ENV === 'production' ? (
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                        ga('create', 'UA-79933409-1', 'auto');
                        ga('require', 'urlChangeTracker');
                        ga('send', 'pageview');`
                    }} />
                ) : null}
                <script dangerouslySetInnerHTML={{
                    __html: `window.process = {
                        env: {
                            BROWSER: 'true',
                            CLIENT_ENV: '${process.env.CLIENT_ENV}',
                            REDUX_LOGGER: '${process.env.REDUX_LOGGER}',
                            API_ENDPOINT: '${process.env.API_ENDPOINT}',
                            GHOST_API_ENDPOINT: '${process.env.GHOST_API_ENDPOINT}',
                            GHOST_API_CLIENT_ID: '${process.env.GHOST_API_CLIENT_ID}',
                            GHOST_API_CLIENT_SECRET: '${process.env.GHOST_API_CLIENT_SECRET}',
                            DISQUS_SHORTNAME: '${process.env.DISQUS_SHORTNAME}',
                            BLOG_ENABLED: '${process.env.BLOG_ENABLED}'
                        }
                    }`
                }} />
                <script dangerouslySetInnerHTML={{
                    __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
                }} />
                <script src={js} async />
            </body>
        </html>
    );
}

Html.propTypes = {
    css: PropTypes.string,
    js: PropTypes.string.isRequired,
    html: PropTypes.string,
    head: PropTypes.object.isRequired,
    initialState: PropTypes.object.isRequired
};

export default Html;
