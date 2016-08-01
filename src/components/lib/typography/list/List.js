import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './List.css';

function List({ ordered, className, ...other }) {
    const Type = ordered ? 'ol' : 'ul';
    return (
        <Type {...other} className={classNames({
            [styles.ordered]: ordered
        }, className, 'typography-list', styles.root)} />
    );
}

List.propTypes = {
    ordered: PropTypes.bool.isRequired,
    className: PropTypes.string
};

List.defaultProps = {
    ordered: false
}

export default List;
