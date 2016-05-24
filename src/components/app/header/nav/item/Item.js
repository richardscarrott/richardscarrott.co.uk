import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
    BodyText
} from '../../../../lib/typography/Typography';
import { Link } from 'react-router';
import styles from './Item.css';

function Item({ to, active, children, className, ...other }) {
    return (
        <li {...other} className={classNames(styles.root, className)}>
            <Link to={to} title={children} activeClassName={styles.active} className={classNames(styles.link, {
                [styles.active]: active
            })}>
                <BodyText inline className={styles.text}>
                    {children}
                </BodyText>
            </Link>
        </li>
    );
}

Item.propTypes = {
    to: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
    className: PropTypes.string
};

Item.defaultProps = {
    active: false
};

export default Item;
