jest.unmock('./code');
jest.unmock('../../selectors/code/code');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../api/code/code';
import {
    FETCH_GITHUB_ACTIVITY_REQUEST,
    FETCH_GITHUB_ACTIVITY_SUCCESS,
    FETCH_GITHUB_ACTIVITY_FAILURE,
    fetchActivityIfNeeded
} from './code';

const mockStore = configureMockStore([
    thunk
]);

describe('actions/code/code', () => {

    describe('fetchActivityIfNeeded', () => {

        beforeEach(() => {
            // TODO: use babel inline requires https://github.com/facebook/fbjs/blob/1458e4e098b42efb0360057b06e98c788936d878/babel-preset/plugins/inline-requires.js
            api.fetchActivity.mockClear();
            api.fetchActivity.mockReturnValue(Promise.resolve({}));
        });

        it('creates FETCH_GITHUB_ACTIVITY_REQUEST', () => {
            const store = mockStore({
                code: {
                    activity: {
                        isFetching: false,
                        events: null
                    }
                }
            });
            store.dispatch(fetchActivityIfNeeded());
            const action = store.getActions()[0];
            expect(action).toBeFSA();
            expect(action).toEqual({
                type: FETCH_GITHUB_ACTIVITY_REQUEST
            });
        });

        it('does not create FETCH_GITHUB_ACTIVITY_REQUEST or call the api when data already exists', () => {
            const store = mockStore({
                code: {
                    activity: {
                        isFetching: false,
                        events: [{}, {}, {}]
                    }
                }
            });
            store.dispatch(fetchActivityIfNeeded());
            expect(store.getActions().length).toBeFalsy();
            expect(api.fetchActivity).not.toBeCalled();
        });

        it('does not create FETCH_GITHUB_ACTIVITY_REQUEST or call the api when already fetching', () => {
            const store = mockStore({
                code: {
                    activity: {
                        isFetching: true,
                        events: null
                    }
                }
            });
            store.dispatch(fetchActivityIfNeeded());
            expect(store.getActions().length).toBeFalsy();
            expect(api.fetchActivity).not.toBeCalled();
        });

        pit('creates FETCH_GITHUB_ACTIVITY_SUCCESS when a successful response is received', () => {
            const response = { foo: 'bar' };
            api.fetchActivity.mockReturnValue(Promise.resolve(response));
            const store = mockStore({
                code: {
                    activity: {
                        isFetching: false,
                        events: null
                    }
                }
            });
            expect(store.getActions()[1]).toBeUndefined();
            return store.dispatch(fetchActivityIfNeeded())
                .then(() => {
                    const action = store.getActions()[1];
                    expect(action).toBeFSA();
                    expect(action).toEqual({
                        type: FETCH_GITHUB_ACTIVITY_SUCCESS,
                        meta: {
                            receivedAt: jasmine.any(Number),
                        },
                        payload: {
                            foo: 'bar'
                        }
                    });
                });
        });

        pit('creates FETCH_GITHUB_ACTIVITY_FAILURE when a failed response is received', () => {
            const response = { message: 'Bad Request' };
            api.fetchActivity.mockReturnValue(Promise.reject(response));
            const store = mockStore({
                code: {
                    activity: {
                        isFetching: false,
                        events: null
                    }
                }
            });
            return store.dispatch(fetchActivityIfNeeded())
                .then(() => {
                    const action = store.getActions()[1];
                    expect(action).toBeFSA();
                    expect(action).toEqual({
                        type: FETCH_GITHUB_ACTIVITY_FAILURE,
                        payload: 'Bad Request'
                    });
                });
        });

    });

});
