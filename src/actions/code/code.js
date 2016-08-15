import * as api from 'api/code/code';
import {
    getIsFetching,
    getHasData
} from 'selectors/code/code';

export const FETCH_GITHUB_ACTIVITY_REQUEST = 'FETCH_GITHUB_ACTIVITY_REQUEST';
export const FETCH_GITHUB_ACTIVITY_SUCCESS = 'FETCH_GITHUB_ACTIVITY_SUCCESS';
export const FETCH_GITHUB_ACTIVITY_FAILURE = 'FETCH_GITHUB_ACTIVITY_FAILURE';

function fetchActivityFailure(error) {
    return {
        type: FETCH_GITHUB_ACTIVITY_FAILURE,
        payload: error.message
    }
}

function fetchActivitySuccess(response) {
    return {
        type: FETCH_GITHUB_ACTIVITY_SUCCESS,
        meta: {
            receivedAt: Date.now(),
        },
        payload: response
    }
}

function fetchActivityRequest() {
    return {
        type: FETCH_GITHUB_ACTIVITY_REQUEST
    };
}

function fetchActivity() {
    return dispatch => {
        dispatch(fetchActivityRequest());
        return api.fetchActivity()
            .then(
                response => dispatch(fetchActivitySuccess(response)),
                error => dispatch(fetchActivityFailure(error))
            )
            .catch(ex => {
                console.error(ex.stack);
            });
    }
}

// TODO: Add shelf life
function shouldFetchActivity(state) {
    const isFetching = getIsFetching(state).getOrElse(false);
    const hasData = getHasData(state).getOrElse(false);
    return !hasData && !isFetching;
}

export function fetchActivityIfNeeded() {
    return (dispatch, getState) => {
        // TODO: Should this return Promise.resolve() if not fetching...
        if (shouldFetchActivity(getState())) {
            return dispatch(fetchActivity());
        }
    };
}
