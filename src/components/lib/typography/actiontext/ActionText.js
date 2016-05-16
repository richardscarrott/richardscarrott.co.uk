import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import styles from './ActionText.css';

function ActionText({ to, href, type, className, ...other }) {
    let Type = 'span';

    if (href) {
        Type = 'a';
    } else if (to) {
        Type = Link;
    } else if (type === 'submit') {
        Type = 'button';
    }

    return (
        <Type {...other} to={to} href={href} type={type} className={classNames(className, styles.root)} />
    );
}

ActionText.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
};

export default ActionText;
