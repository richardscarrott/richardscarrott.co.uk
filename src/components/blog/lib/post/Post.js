import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import transformMarkdown from '../../../../utils/transformMarkdown';
import {
    H1,
    H2,
    BodyText,
    ActionText
} from '../../../lib/typography/Typography';
import styles from './Post.css';

const DATE_FORMAT = 'Do MMMM, YYYY';

function Post({ title, markdown, slug, published_at, excerpt, useH1, className }) {
    debugger;
    return (
        <div className={classNames(styles.root, className)}>
            <H1>
                <ActionText to={`/post/${slug}/`}>
                    {title}
                </ActionText>
            </H1>
            <BodyText>
                {moment(published_at).format(DATE_FORMAT)}
            </BodyText>
            {transformMarkdown(markdown)}
        </div>
    );
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    markdown: PropTypes.string.isRequired,
    excerpt: PropTypes.bool,
    h1: PropTypes.bool,
    className: PropTypes.string,
};

Post.defaultProps = {
    h1: false,
    excerpt: false
};

export default Post;
