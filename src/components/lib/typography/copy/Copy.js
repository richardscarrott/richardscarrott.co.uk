import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'components/lib/typography/copy/Copy.css';

function Copy({ children, className }) {
    return (
        <div className={classNames(styles.root, className)}>
            {children}
        </div>
    );
}

Copy.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default Copy;
