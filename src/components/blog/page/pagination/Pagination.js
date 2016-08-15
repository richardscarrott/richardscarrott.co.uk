import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { BodyText, ActionText } from 'components/lib/typography/Typography';
import styles from 'components/blog/page/pagination/Pagination.css';

function Pagination({ page, pages, className }) {
    return (
        <div className={classNames(styles.root, className)}>
            {page < pages ? (
                <BodyText className={styles.older}>
                    <ActionText to={`/blog/page/${page + 1}`}>
                        ← Older Posts
                    </ActionText>
                </BodyText>
            ) : null}
            {page > 1 ? (
                <BodyText className={styles.newer}>
                    <ActionText to={`/blog/page/${page - 1}`}>
                        Newer Posts →
                    </ActionText>
                </BodyText>
            ) : null}
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    className: PropTypes.string
};

export default Pagination;
