import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Header from './header/Header';
import styles from './App.css';

const DEFAULT_TITLE = 'Richard Scarrott, Frontend Web Developer';

function App({ children }) {
    return (
        <div className={styles.root}>
            <Helmet
                titleTemplate={`%s | ${DEFAULT_TITLE}`}
                defaultTitle={DEFAULT_TITLE}
                link={[
                    {
                        rel: 'canonical',
                        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700'
                    }
                ]} />
            <Header className={styles.header} />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

App.propTypes = {
    children: PropTypes.element
};

export default App;
