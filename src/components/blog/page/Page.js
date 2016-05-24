import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { __, curry, compose, defaultTo } from 'ramda';
import { fetchPostsIfNeeded } from '../../../actions/blog/blog';
import {
    getPageIsFetching,
    getPageError,
    getPage,
    getPagination
} from '../../../selectors/blog/blog';
import {
    H1,
    ActionText
} from '../../lib/typography/Typography';
import Loader from '../../lib/loader/Loader';
import Post from '../lib/post/Post';
import Pagination from './pagination/Pagination';
import styles from './Page.css';

const getPageNumber = compose(
    defaultTo(1),
    curry(parseInt)(__, 10)
);

class PageContainer extends Component {

    constructor(props) {
        super(props);
        this.handleRetry = this.handleRetry.bind(this);
    }

    componentDidMount() {
        PageContainer.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.pageNumber !== this.props.params.pageNumber) {
            PageContainer.fetchData({
                store: this.context.store,
                params: nextProps.params
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.pageNumber !== this.props.params.pageNumber) {
            window.scrollTo(0, 0);
        }
    }

    handleRetry() {
        PageContainer.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    render() {
        const { isFetching, error, posts, params, pagination } = this.props;
        return (
            <div className={styles.root}>
                <Helmet title="Blog" />
                {isFetching ? (
                    <Loader />
                ) : null}
                {error ? (
                    <div onClick={this.handleRetry}>Error... {error}</div>
                ) : null}
                {posts.length ? (
                    <div className={styles.posts}>
                        {posts.map((post, i) => {
                            return (
                                <Post {...post} key={post.id} excerpt h1={i === 0} className={styles.post} />
                            );
                        })}
                        <Pagination {...pagination} page={getPageNumber(params.pageNumber)} className={styles.pagination} />
                    </div>
                ) : null}
            </div>
        );
    }
}

PageContainer.contextTypes = {
    store: PropTypes.object.isRequired
};

PageContainer.fetchData = function({ store, params }) {
    const pageNumber = getPageNumber(params.pageNumber);
    return store.dispatch(fetchPostsIfNeeded(pageNumber));
};

// Avoid creating a new instance everytime mapStateToProps is called to ensure
// shouldComponentUpdate isn't invalidated.
const EMPTY_POSTS = [];
const EMPTY_PAGINATION = {};

function mapStateToProps(state, props) {
    const pageNumber = getPageNumber(props.params.pageNumber);
    return {
        isFetching: getPageIsFetching(pageNumber, state).getOrElse(false),
        error: getPageError(pageNumber, state).getOrElse(false),
        posts: getPage(pageNumber, state).getOrElse(EMPTY_POSTS),
        pagination: getPagination(state).getOrElse(EMPTY_PAGINATION)
    };
}

export default connect(mapStateToProps)(PageContainer);
