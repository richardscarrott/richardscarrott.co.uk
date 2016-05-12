import { combineReducers } from 'redux';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from '../../actions/blog/blog';

function authors(state = {}, action) {
    switch(action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                ...action.payload.entities.authors
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
                ...action.payload.entities.posts
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
