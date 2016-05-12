jest.unmock('./code');

import reducer from './code';
import {
    FETCH_GITHUB_ACTIVITY_REQUEST,
    FETCH_GITHUB_ACTIVITY_SUCCESS,
    FETCH_GITHUB_ACTIVITY_FAILURE
} from '../../actions/code/code';

describe('reducers/code/code', () => {

    it('returns the initial state', () => {
        expect(
            reducer(void 0, {})
        ).toEqual({
            activity: {
                isFetching: false,
                error: null,
                lastUpdated: null,
                events: null
            }
        });
    });

    it('handles FETCH_GITHUB_ACTIVITY_REQUEST', () => {
        const action = {
            type: FETCH_GITHUB_ACTIVITY_REQUEST
        };
        const state = {
            activity: {
                isFetching: false,
                error: 'Bad Request',
                lastUpdated: null,
                events: null
            }
        };
        expect(
            reducer(state, action)
        ).toEqual({
            activity: {
                isFetching: true,
                error: null,
                lastUpdated: null,
                events: null
            }
        });
    });

    it('handles FETCH_GITHUB_ACTIVITY_SUCCESS', () => {
        const action = {
            type: FETCH_GITHUB_ACTIVITY_SUCCESS,
            meta: {
                receivedAt: 123
            },
            payload: [1, 2, 3]
        };
        const state = {
            activity: {
                isFetching: true,
                error: null,
                lastUpdated: null,
                events: null
            }
        };
        expect(
            reducer(state, action)
        ).toEqual({
            activity: {
                isFetching: false,
                error: null,
                lastUpdated: 123,
                events: [1, 2, 3]
            }
        });
    });

    it('handles FETCH_GITHUB_ACTIVITY_FAILURE', () => {
        const action = {
            type: FETCH_GITHUB_ACTIVITY_FAILURE,
            payload: 'Bad Request'
        };
        const state = {
            activity: {
                isFetching: true,
                error: null,
                lastUpdated: null,
                events: null
            }
        };
        expect(
            reducer(state, action)
        ).toEqual({
            activity: {
                isFetching: false,
                error: 'Bad Request',
                lastUpdated: null,
                events: null
            }
        });
    });

});
