import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Header from 'components/app/header/Header';
import ProgressBar from 'components/app/progressbar/ProgressBar';
import styles from 'components/app/App.css';

const DEFAULT_TITLE = 'Richard Scarrott, Frontend Web Developer';

function App({ showProgressBar, children }) {
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
            <ProgressBar active={showProgressBar} className={styles.progressBar} />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

App.propTypes = {
    showProgressBar: PropTypes.bool.isRequired,
    children: PropTypes.element
};

function mapStateToProps(state) {
    return {
        showProgressBar: !!state.ui.activity
    };
}

export default connect(mapStateToProps)(App);
