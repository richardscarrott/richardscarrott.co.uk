import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { defaultTo } from 'ramda';
import { fetchPostsIfNeeded } from '../../actions/blog/blog';
import {
    getPageIsFetching,
    getPageError,
    getPage
} from '../../selectors/blog/blog';

const getPageNumber = defaultTo(1);

class Blog extends Component {

    constructor(props) {
        super(props);
        this.handleRetry = this.handleRetry.bind(this);
    }

    componentDidMount() {
        Blog.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.pageNumber !== this.props.params.pageNumber) {
            Blog.fetchData({
                store: this.context.store,
                params: nextProps.params
            });
        }
    }

    handleRetry() {
        Blog.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    render() {
        const posts = this.props.posts.map(post => {
            return (
                <div key={post.id}>
                    <h1 style={{ fontWeight: 'bold' }}>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{
                        __html: post.html
                    }} />
                </div>
            );
        });
        return (
            <div>
                <Helmet title="Blog" />
                <Link to="/page/1">Page 1</Link>
                <Link to="/page/2">Page 2</Link>
                <Link to="/page/3">Page 3</Link>
                {this.props.isFetching ? (
                    <div>Loading...</div>
                ) : null}
                {this.props.error ? (
                    <div onClick={this.handleRetry}>Error... {this.props.error}</div>
                ) : null}
                {posts}
            </div>
        );
    }
}

Blog.contextTypes = {
    store: PropTypes.object.isRequired
};

Blog.fetchData = function({store, params}) {
    const pageNumber = getPageNumber(parseInt(params.pageNumber, 10));
    return store.dispatch(fetchPostsIfNeeded(pageNumber));
};

function mapStateToProps(state, props) {
    const pageNumber = getPageNumber(parseInt(props.params.pageNumber, 10));
    return {
        isFetching: getPageIsFetching(pageNumber, state).getOrElse(false),
        error: getPageError(pageNumber, state).getOrElse(false),
        posts: getPage(pageNumber, state).getOrElse([])
    };
}

export default connect(mapStateToProps)(Blog);
