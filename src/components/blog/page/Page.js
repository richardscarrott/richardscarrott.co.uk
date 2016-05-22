import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { defaultTo } from 'ramda';
import { fetchPostsIfNeeded } from '../../../actions/blog/blog';
import {
    getPageIsFetching,
    getPageError,
    getPage
} from '../../../selectors/blog/blog';
import {
    H1,
    ActionText
} from '../../lib/typography/Typography';
import Loader from '../../lib/loader/Loader';
import Post from '../lib/post/Post';
import styles from './Page.css';

const getPageNumber = defaultTo(1);

class PageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show1: false,
            show2: false
        };
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

    handleRetry() {
        PageContainer.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    render() {
        const { isFetching, error, posts } = this.props;
        return (
            <div className={styles.root}>
                <Helmet title="Blog" />
                <span onClick={() => {
                    this.setState({
                        show1: !this.state.show1
                    });
                }}>
                    Show 1
                </span>
                <span onClick={() => {
                    this.setState({
                        show2: !this.state.show2
                    });
                }}>
                    Show 2
                </span>
                {this.state.show1 ? <Loader /> : null}
                {this.state.show2 ? <Loader /> : null}
                {isFetching ? (
                    <Loader />
                ) : null}
                {error ? (
                    <div onClick={this.handleRetry}>Error... {error}</div>
                ) : null}
                {posts.map((post, i) => {
                    return (
                        <Post {...post} excerpt h1={i === 0} className={styles.post} />
                    );
                })}
            </div>
        );
    }
}

PageContainer.contextTypes = {
    store: PropTypes.object.isRequired
};

PageContainer.fetchData = function({ store, params }) {
    const pageNumber = getPageNumber(parseInt(params.pageNumber, 10));
    return store.dispatch(fetchPostsIfNeeded(pageNumber));
};

// Avoid creating a new instance everytime mapStateToProps is called to ensure
// shouldComponentUpdate isn't invalidated.
const EMPTY_POSTS = [];

function mapStateToProps(state, props) {
    const pageNumber = getPageNumber(parseInt(props.params.pageNumber, 10));
    return {
        isFetching: getPageIsFetching(pageNumber, state).getOrElse(false),
        error: getPageError(pageNumber, state).getOrElse(false),
        posts: getPage(pageNumber, state).getOrElse(EMPTY_POSTS)
    };
}

export default connect(mapStateToProps)(PageContainer);
