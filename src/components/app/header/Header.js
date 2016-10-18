import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Logo from 'components/app/header/logo/Logo';
import Nav from 'components/app/header/nav/Nav';
import styles from 'components/app/header/Header.css';

function Header({ className, ...other }) {
    return (
        <div {...other} className={classNames(styles.root, className)}>
            <Logo className={styles.logo} />
            {process.env.BLOG_ENABLED === 'true' ? <Nav className={styles.nav} /> : null}
        </div>
    );
}

Header.propTypes = {
    className: PropTypes.string
};

export default Header;
