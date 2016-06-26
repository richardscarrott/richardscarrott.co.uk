import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Logo from './logo/Logo';
import Nav from './nav/Nav';
import styles from './Header.css';

function Header({ className, ...other }) {
    return (
        <div {...other} className={classNames(styles.root, className)}>
            <Logo className={styles.logo} />
            {process.env.BLOG_ENABLED ? <Nav className={styles.nav} /> : null}
        </div>
    );
}

Header.propTypes = {
    className: PropTypes.string
};

export default Header;
