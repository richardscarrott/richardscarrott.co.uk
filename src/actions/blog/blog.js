import * as api from '../../api/blog/blog';
import {
    getPageIsFetching,
    getPageHasData
} from '../../selectors/blog/blog';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

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
            );
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
