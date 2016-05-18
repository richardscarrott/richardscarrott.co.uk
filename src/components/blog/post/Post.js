import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { fetchPostIfNeeded } from '../../../actions/blog/blog';
import {
    getPostIsFetching,
    getPostError,
    getPost
} from '../../../selectors/blog/blog';
import Post from '../lib/post/Post';
import styles from './Post.css';

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
            content = <div>LOADING</div>
        } else if (error) {
            content = <div onClick={this.handleRetry}>ERROR</div>
        } else if (post) {
            content = <Post {...post} />
        } else {
            return null;
        }
        return (
            <div className={styles.root}>
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
    var a = getPost(slug, state).getOrElse(null);
    var b = getPost(slug, state).getOrElse(null);
    return {
        isFetching: getPostIsFetching(slug, state).getOrElse(false),
        error: getPostError(slug, state).getOrElse(null),
        post: getPost(slug, state).getOrElse(null)
    };
}

export default connect(mapStateToProps)(PostContainer);
