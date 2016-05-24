import * as api from '../../api/blog/blog';
import {
    getPageIsFetching,
    getPageHasData,
    getPostIsFetching,
    getPost
} from '../../selectors/blog/blog';

// TODO: Rename to fetchOnePost and fetchAllPosts for clarity?

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

function fetchPostsFailure(page, error) {
    return {
        type: FETCH_POSTS_FAILURE,
        meta: {
            page
        },
        payload: error.message
    }
}

function fetchPostsSuccess(page, response) {
    return {
        type: FETCH_POSTS_SUCCESS,
        meta: {
            receivedAt: Date.now(),
            page
        },
        payload: response
    }
}

function fetchPostsRequest(page) {
    return {
        type: FETCH_POSTS_REQUEST,
        meta: {
            page
        }
    };
}

function fetchPosts(page) {
    return dispatch => {
        dispatch(fetchPostsRequest(page));
        return api.fetchPosts(page)
            .then(
                response => dispatch(fetchPostsSuccess(page, response)),
                error => dispatch(fetchPostsFailure(page, error))
            )
            .catch(ex => {
                console.error(ex);
            });
    }
}

function shouldFetchPosts(page, state) {
    const hasData = getPageHasData(page, state).getOrElse(false);
    const isFetching = getPageIsFetching(page, state).getOrElse(false);
    return !hasData && !isFetching;
}

export function fetchPostsIfNeeded(page) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(page, getState())) {
            return dispatch(fetchPosts(page));
        }
    };
}

function fetchPostFailure(slug, error) {
    return {
        type: FETCH_POST_FAILURE,
        meta: {
            slug
        },
        payload: error.message
    };
}

function fetchPostSuccess(slug, response) {
    return {
        type: FETCH_POST_SUCCESS,
        meta: {
            receivedAt: Date.now(),
            slug
        },
        payload: response
    };
}

function fetchPostRequest(slug) {
    return {
        type: FETCH_POST_REQUEST,
        meta: {
            slug
        }
    };
}

function fetchPost(slug) {
    return dispatch => {
        dispatch(fetchPostRequest(slug))
        return api.fetchPost(slug)
            .then(
                response => dispatch(fetchPostSuccess(slug, response)),
                error => dispatch(fetchPostFailure(slug, error))
            )
            .catch(ex => {
                console.error(ex.stack);
            });
    }
}

function shouldFetchPost(slug, state) {
    const post = getPost(slug, state).getOrElse(null);
    const isFetching = getPostIsFetching(slug, state).getOrElse(false);
    return !post && !isFetching;
}

export function fetchPostIfNeeded(slug) {
    return (dispatch, getState) => {
        if (shouldFetchPost(slug, getState())) {
            return dispatch(fetchPost(slug));
        }
    }
}
