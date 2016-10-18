import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { fetchPostIfNeeded } from 'actions/blog/blog';
import {
    getPostIsFetching,
    getPostError,
    getPost
} from 'selectors/blog/blog';
import Loader from 'components/lib/loader/Loader';
import Post from 'components/blog/lib/post/Post';
import Comments from 'components/blog/post/comments/Comments';
import styles from 'components/blog/post/Post.css';

class PostContainer extends Component {

    constructor(props) {
        super(props);
        this.handleRetry = this.handleRetry.bind(this);
    }

    componentDidMount() {
        PostContainer.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.slug !== this.props.params.slug) {
            PostContainer.fetchData({
                store: this.context.store,
                params: nextProps.params
            });
        }
    }

    handleRetry() {
        PostContainer.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    render() {
        const { isFetching, error, post } = this.props;
        let content;
        if (isFetching) {
            content = <Loader />
        } else if (error) {
            content = <div onClick={this.handleRetry}>ERROR</div>
        } else if (post) {
            content = (
                <div>
                    <Helmet title={post.title} />
                    <Post {...post} h1 />
                    <Comments {...post} className={styles.comments} />
                </div>
            );
        } else {
            return null;
        }
        return (
            <div data-automation-id="Post" className={styles.root}>
                {content}
            </div>
        );
    }
}

PostContainer.contextTypes = {
    store: PropTypes.object.isRequired
};

PostContainer.fetchData = function({ store, params }) {
    return store.dispatch(fetchPostIfNeeded(params.slug));
};

function mapStateToProps(state, props) {
    const slug = props.params.slug;
    return {
        isFetching: getPostIsFetching(slug, state).getOrElse(false),
        error: getPostError(slug, state).getOrElse(null),
        post: getPost(slug, state).getOrElse(null)
    };
}

export default connect(mapStateToProps)(PostContainer);
