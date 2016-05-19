import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { defaultTo } from 'ramda';
// Would it be better to create a PostComponent which has an excerpt option, yes it would.
import { transformExcerpt } from '../../../utils/transformMarkdown';
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

const getPageNumber = defaultTo(1);

class Page extends Component {

    constructor(props) {
        super(props);
        this.handleRetry = this.handleRetry.bind(this);
    }

    componentDidMount() {
        Page.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.pageNumber !== this.props.params.pageNumber) {
            Page.fetchData({
                store: this.context.store,
                params: nextProps.params
            });
        }
    }

    handleRetry() {
        Page.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    render() {
        const posts = this.props.posts.map(post => {
            return (
                <div key={post.id}>
                    <H1>
                        <ActionText to={`/blog/post/${post.slug}/`}>
                            {post.title}
                        </ActionText>
                    </H1>
                    {transformExcerpt(post.markdown)}
                </div>
            );
        });
        return (
            <div>
                <Helmet title="Page" />
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

Page.contextTypes = {
    store: PropTypes.object.isRequired
};

Page.fetchData = function({ store, params }) {
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

export default connect(mapStateToProps)(Page);
