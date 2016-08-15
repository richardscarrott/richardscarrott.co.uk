jest.unmock('reducers/blog/blog');

import reducer from 'reducers/blog/blog';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE
} from 'actions/blog/blog';

describe('reducers/blog/blog', () => {

    it('returns the initial state', () => {
        expect(
            reducer(void 0, {})
        ).toEqual({
            pagination: null,
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
            pagination: null,
            entities: {
                posts: {},
                authors: {}
            },
            pages: {}
        };
        expect(
            reducer(state, action)
        ).toEqual({
            pagination: null,
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
                        'post-1': {
                            name: 'Post 1'
                        },
                        'post-2': {
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
                    meta: {
                        pagination: {
                            page: 1,
                            pages: 3
                        }
                    },
                    posts: [1, 2]
                }
            }
        };
        const state = {
            pagination: null,
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
            pagination: {
                pages: 3
            },
            entities: {
                posts: {
                    'post-1': {
                        isFetching: false,
                        error: null,
                        post: {
                            name: 'Post 1'
                        }
                    },
                    'post-2': {
                        isFetching: false,
                        error: null,
                        post: {
                            name: 'Post 2'
                        }
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
            pagination: null,
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
            pagination: null,
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

    it('handles FETCH_POST_REQUEST', () => {
        const action = {
            type: FETCH_POST_REQUEST,
            meta: {
                slug: 'post-1'
            }
        };
        const state = {
            pagination: null,
            entities: {
                posts: {},
                authors: {}
            },
            pages: {}
        };
        expect(
            reducer(state, action)
        ).toEqual({
            pagination: null,
            entities: {
                posts: {
                    'post-1': {
                        isFetching: true,
                        error: null,
                        post: null
                    }
                },
                authors: {}
            },
            pages: {}
        });
    });

    it('handles FETCH_POST_SUCCESS', () => {
        const action = {
            type: FETCH_POST_SUCCESS,
            meta: {
                slug: 'post-1'
            },
            payload: {
                entities: {
                    posts: {
                        'post-1': {
                            name: 'Post 1'
                        }
                    },
                    authors: {
                        1: {
                            name: 'Author 1'
                        }
                    }
                },
                result: {
                    posts: [1]
                }
            }
        };
        const state = {
            pagination: null,
            entities: {
                posts: {
                    isFetching: true,
                    error: null,
                    post: null
                },
                authors: {}
            },
            pages: {}
        };
        expect(
            reducer(state, action)
        ).toEqual({
            pagination: null,
            entities: {
                posts: {
                    'post-1': {
                        isFetching: false,
                        error: null,
                        post: {
                            name: 'Post 1'
                        }
                    }
                },
                authors: {
                    1: {
                        name: 'Author 1'
                    }
                }
            },
            pages: {}
        });
    });

    it('handles FETCH_POST_FAILURE', () => {
        const action = {
            type: FETCH_POST_FAILURE,
            meta: {
                slug: 'post-1'
            },
            payload: 'Bad Request'
        };
        const state = {
            pagination: null,
            entities: {
                posts: {
                    'post-1': {
                        isFetching: true,
                        error: null,
                        post: null
                    }
                }
            },
            pages: {}
        };
        expect(
            reducer(state, action)
        ).toEqual({
            pagination: null,
            entities: {
                posts: {
                    'post-1': {
                        isFetching: false,
                        error: 'Bad Request',
                        post: null
                    }
                },
                authors: {}
            },
            pages: {}
        });
    });

});
