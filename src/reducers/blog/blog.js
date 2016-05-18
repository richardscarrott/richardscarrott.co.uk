import { combineReducers } from 'redux';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE
} from '../../actions/blog/blog';

function post(state = {
    isFetching: false,
    error: null,
    post: null
}, action) {
    switch(action.type) {
        case FETCH_POST_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                post: action.payload.entities.posts[action.meta.slug],
            };
        case FETCH_POST_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
}

function posts(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                ...Object.keys(action.payload.entities.posts).reduce((acc, slug) => {
                    acc[slug] = {
                        isFetching: false,
                        error: null,
                        post: action.payload.entities.posts[slug]
                    };
                    return acc;
                }, {})
            };
        case FETCH_POST_REQUEST:
        case FETCH_POST_SUCCESS:
        case FETCH_POST_FAILURE:
            return {
                [action.meta.slug]: post(state[action.meta.slug], action)
            };
        default:
            return state;
    }
}

function authors(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS_SUCCESS:
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                ...action.payload.entities.authors
            };
        default:
            return state;
    }
}

const entities = combineReducers({
    posts,
    authors
});

function page(state = {
    isFetching: false,
    error: null,
    posts: null
}, action) {
    switch(action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                posts: action.payload.result.posts
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
}

function pages(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS_REQUEST:
        case FETCH_POSTS_SUCCESS:
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                [action.meta.page]: page(state[action.meta.page], action)
            };
        default:
            return state;
    }
}

const blog = combineReducers({
    pages,
    entities
});

export default blog;
