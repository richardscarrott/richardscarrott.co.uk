import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDisqusThread from 'react-disqus-thread';
import styles from './Comments.css';

function Comments({ id, title, className, ...other }) {
    return (
        <ReactDisqusThread
            className={classNames(styles.root, className)}
            shortname={process.env.DISQUS_SHORTNAME}
            identifier={`blog-post-${id}`}
            title={title} />
    );
}

Comments.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Comments;
