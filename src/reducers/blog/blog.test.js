jest.unmock('./blog');

import reducer from './blog';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from '../../actions/blog/blog';

describe('reducers/blog/blog', () => {

    it('returns the initial state', () => {
        expect(
            reducer(void 0, {})
        ).toEqual({
            entities: {
                posts: {},
                authors: {}
            },
            pages: {}
        });
    });

    it('handles FETCH_POSTS_REQUEST', () => {
        const action = {
            type: FETCH_POSTS_REQUEST,
            meta: {
                page: 1
            }
        };
        const state = {
            entities: {
                posts: {},
                authors: {}
            },
            pages: {}
        };
        expect(
            reducer(state, action)
        ).toEqual({
            entities: {
                posts: {},
                authors: {}
            },
            pages: {
                1: {
                    isFetching: true,
                    error: null,
                    posts: null
                }
            }
        });
    });

    it('handles FETCH_POSTS_SUCCESS', () => {
        const action = {
            type: FETCH_POSTS_SUCCESS,
            meta: {
                page: 1
            },
            payload: {
                entities: {
                    posts: {
                        1: {
                            name: 'Post 1'
                        },
                        2: {
                            name: 'Post 2'
                        }
                    },
                    authors: {
                        1: {
                            name: 'Author 1'
                        }
                    }
                },
                result: {
                    posts: [1, 2]
                }
            }
        };
        const state = {
            entities: {
                posts: {},
                authors: {}
            },
            pages: {
                1: {
                    isFetching: true,
                    error: null,
                    posts: null
                }
            }
        };
        expect(
            reducer(state, action)
        ).toEqual({
            entities: {
                posts: {
                    1: {
                        name: 'Post 1'
                    },
                    2: {
                        name: 'Post 2'
                    }
                },
                authors: {
                    1: {
                        name: 'Author 1'
                    }
                }
            },
            pages: {
                1: {
                    isFetching: false,
                    error: null,
                    posts: [1, 2]
                }
            }
        });
    });

    it('handles FETCH_POSTS_FAILURE', () => {
        const action = {
            type: FETCH_POSTS_FAILURE,
            meta: {
                page: 1
            },
            payload: 'Bad Request'
        };
        const state = {
            entities: {
                posts: {},
                authors: {}
            },
            pages: {
                1: {
                    isFetching: true,
                    error: null,
                    posts: null
                }
            }
        };
        expect(
            reducer(state, action)
        ).toEqual({
            entities: {
                posts: {},
                authors: {}
            },
            pages: {
                1: {
                    isFetching: false,
                    error: 'Bad Request',
                    posts: null
                }
            }
        });
    });

});
