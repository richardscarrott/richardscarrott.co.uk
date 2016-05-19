import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Item from './item/Item';
import { Link, IndexLink } from 'react-router';
import styles from './Nav.css';

function Nav({ className }, { location }) {
    return (
        <nav className={classNames(styles.root, className)}>
            <ul className={styles.items}>
                <Item to="/blog" active={location.pathname === '/'} className={styles.item}>
                    Blog
                </Item>
                <Item to="/code" className={styles.item}>
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
