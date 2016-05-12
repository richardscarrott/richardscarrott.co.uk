import { combineReducers } from 'redux';
import {
    FETCH_GITHUB_ACTIVITY_REQUEST,
    FETCH_GITHUB_ACTIVITY_SUCCESS,
    FETCH_GITHUB_ACTIVITY_FAILURE
} from '../../actions/code/code';

function activity(state = {
    isFetching: false,
    error: null,
    lastUpdated: null,
    events: null
}, action) {
    switch(action.type) {
        case FETCH_GITHUB_ACTIVITY_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_GITHUB_ACTIVITY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.meta.receivedAt,
                events: action.payload
            };
        case FETCH_GITHUB_ACTIVITY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
}

const code = combineReducers({
    activity
});

export default code;
