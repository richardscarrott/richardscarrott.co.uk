import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link, IndexLink } from 'react-router';
import Item from 'components/app/header/nav/item/Item';
import styles from 'components/app/header/nav/Nav.css';

function Nav({ className }, { location }) {
    return (
        <nav className={classNames(styles.root, className)}>
            <ul className={styles.items}>
                <Item to="/blog" active={location.pathname === '/'} data-automation-id="BlogLink" className={styles.item}>
                    Blog
                </Item>
                <Item to="/code" data-automation-id="CodeLink" className={styles.item}>
                    Code
                </Item>
            </ul>
        </nav>
    );
}

Nav.contextTypes = {
    location: PropTypes.object.isRequired
};

Nav.propTypes = {
    className: PropTypes.string
};

export default Nav;
