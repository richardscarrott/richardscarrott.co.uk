import React, { PropTypes } from 'react';
import classNames from 'classnames';
import transformMarkdown from '../../../../utils/transformMarkdown';
import {
    H1,
    BodyText,
    Copy,
    ActionText
} from '../../../lib/typography/Typography';
import Meta from './meta/Meta';
import styles from './Post.css';

function Post({ title, markdown, slug, published_at, author, excerpt, h1, className }) {
    const url = `/blog/post/${slug}/`;
    return (
        <div className={classNames(styles.root, className)}>
            <H1 weight="bold" elementType={h1 ? 'h1' : 'h2'}>
                {excerpt ? (
                    <ActionText to={url}>
                        {title}
                    </ActionText>
                ) : title}
            </H1>
            <Meta {...author} publishedAt={published_at} className={styles.meta} />
            <Copy>
                {transformMarkdown(markdown, excerpt)}
            </Copy>
            {excerpt ? (
                <BodyText className={styles.readMore}>
                    <ActionText to={url}>
                        Read more →
                    </ActionText>
                </BodyText>
            ) : null}
        </div>
    );
}

Post.propTypes = {
    title: PropTypes.string.isRequired,
    markdown: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    excerpt: PropTypes.bool.isRequired,
    className: PropTypes.string
};

Post.defaultProps = {
    h1: false,
    excerpt: false
};

export default Post;
