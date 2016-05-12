import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const DEFAULT_TITLE = 'Richard Scarrott, Frontend Web Developer';

function App({children}) {
    return (
        <div>
            <Helmet titleTemplate={`%s | ${DEFAULT_TITLE}`} defaultTitle={DEFAULT_TITLE} />
            <div>Richard Scarrott|</div>
            <Link to="/">Blog</Link>
            <Link to="/code">Code</Link>
            {children}
        </div>
    );
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
