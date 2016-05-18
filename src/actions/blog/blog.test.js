jest.unmock('./blog');
jest.unmock('../../selectors/blog/blog');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../api/blog/blog';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    fetchPostsIfNeeded
} from './blog';

const mockStore = configureMockStore([
    thunk
]);

// TODO: Write tests for new post actions
describe('actions/blog/blog', () => {

    describe('fetchPostsIfNeeded', () => {

        beforeEach(() => {
            api.fetchPosts.mockClear();
            api.fetchPosts.mockReturnValue(Promise.resolve({}));
        });

        it('creates FETCH_POSTS_REQUEST if the page does not exist', () => {
            const store = mockStore({
                blog: {
                    pages: {}
                }
            });
            store.dispatch(fetchPostsIfNeeded(1));
            const action = store.getActions()[0];
            expect(action).toBeFSA();
            expect(action).toEqual({
                type: FETCH_POSTS_REQUEST,
                meta: {
                    page: 1
                }
            });
        });

        it('creates FETCH_POSTS_REQUEST if the page has no data', () => {
            const store = mockStore({
                blog: {
                    pages: {
                        1: {
                            isFetching: false,
                            posts: null
                        }
                    }
                }
            });
            store.dispatch(fetchPostsIfNeeded(1));
            const action = store.getActions()[0];
            expect(action).toBeFSA();
            expect(action).toEqual({
                type: FETCH_POSTS_REQUEST,
                meta: {
                    page: 1
                }
            });
        });

        it('does not create FETCH_POSTS_REQUEST or call the api when data already exists', () => {
            const store = mockStore({
                blog: {
                    pages: {
                        1: {
                            isFetching: false,
                            posts: [1, 2, 3]
                        }
                    }
                }
            });
            store.dispatch(fetchPostsIfNeeded(1));
            expect(store.getActions().length).toBeFalsy();
            expect(api.fetchPosts).not.toBeCalled();
        });

        it('does not create FETCH_POSTS_REQUEST or call the api when already fetching', () => {
            const store = mockStore({
                blog: {
                    pages: {
                        1: {
                            isFetching: true,
                            posts: null
                        }
                    }
                }
            });
            store.dispatch(fetchPostsIfNeeded(1));
            expect(store.getActions().length).toBeFalsy();
            expect(api.fetchPosts).not.toBeCalled();
        });

        pit('creates FETCH_POSTS_SUCCESS when a successful response is received', () => {
            const response = { foo: 'bar' };
            api.fetchPosts.mockReturnValue(Promise.resolve(response));
            const store = mockStore({
                blog: {
                    pages: {}
                }
            });
            expect(store.getActions()[1]).toBeUndefined();
            return store.dispatch(fetchPostsIfNeeded(1))
                .then(() => {
                    const action = store.getActions()[1];
                    expect(action).toBeFSA();
                    expect(action).toEqual({
                        type: FETCH_POSTS_SUCCESS,
                        meta: {
                            receivedAt: jasmine.any(Number),
                            page: 1
                        },
                        payload: {
                            foo: 'bar'
                        }
                    });
                });
        });

        pit('creates FETCH_POSTS_FAILURE when a failed response is received', () => {
            const response = { message: 'Bad Request' };
            api.fetchPosts.mockReturnValue(Promise.reject(response));
            const store = mockStore({
                blog: {
                    pages: {}
                }
            });
            return store.dispatch(fetchPostsIfNeeded(1))
                .then(() => {
                    const action = store.getActions()[1];
                    expect(action).toBeFSA();
                    expect(action).toEqual({
                        type: FETCH_POSTS_FAILURE,
                        meta: {
                            page: 1
                        },
                        payload: 'Bad Request'
                    });
                });
        });

    });

});
