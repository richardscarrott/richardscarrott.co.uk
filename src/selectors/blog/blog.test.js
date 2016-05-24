jest.unmock('reselect');
jest.unmock('./blog');

import { partial } from 'ramda';
import { Maybe } from 'ramda-fantasy';
import {
    getPageIsFetching,
    getPageError,
    getPage,
    getPageHasData,
    getPostIsFetching,
    getPostError,
    getPost,
    getPagination
} from './blog';

describe('selectors/blog/blog', () => {

    describe('getPageIsFetching', () => {
        it('returns false when the page is not fetching', () => {
            const state = {
                blog: {
                    pages: {
                        1: {
                            isFetching: false
                        }
                    }
                }
            };
            const result = getPageIsFetching(1, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(false);
        });

        it('returns true when the page is fetching', () => {
            const state = {
                blog: {
                    pages: {
                        2: {
                            isFetching: true
                        }
                    }
                }
            };
            const result = getPageIsFetching(2, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(true);
        });

        it('returns Nothing when the page does not exist', () => {
            const state = {
                blog: {
                    pages: {}
                }
            };
            const getPage999IsFetching = partial(getPageIsFetching, [999, state]);
            expect(getPage999IsFetching).not.toThrow();
            expect(getPage999IsFetching()).toBeNothing();
        });
    });

    describe('getPageError', () => {
        it('returns Nothing when the page has no error', () => {
            const state = {
                blog: {
                    pages: {
                        1: {
                            error: null
                        }
                    }
                }
            };
            const result = getPageError(1, state);
            expect(result).toBeNothing();
        });

        it('returns the error when the page has an error', () => {
            const state = {
                blog: {
                    pages: {
                        2: {
                            error: 'Bad Request'
                        }
                    }
                }
            };
            const result = getPageError(2, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe('Bad Request');
        });

        it('returns Nothing when the page does not exist', () => {
            const state = {
                blog: {
                    pages: {}
                }
            };
            const getPage999Error = partial(getPageError, [999, state]);
            expect(getPage999Error).not.toThrow();
            expect(getPage999Error()).toBeNothing();
        });
    });

    describe('getPage', () => {
        it('returns the page when it exists', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            1: {
                                isFetching: false,
                                error: null,
                                post: {
                                    name: 'Post 1',
                                    author: 2
                                }
                            },
                            2: {
                                isFetching: false,
                                error: null,
                                post: {
                                    name: 'Post 2',
                                    author: 1
                                }
                            },
                            3: {
                                isFetching: false,
                                error: null,
                                post: {
                                    name: 'Post 2',
                                    author: 3 // Does not exist
                                }
                            }
                        },
                        authors: {
                            1: {
                                name: 'Author 1'
                            },
                            2: {
                                name: 'Author 2'
                            }
                        }
                    },
                    pages: {
                        1: {
                            isFetching: false,
                            error: null,
                            posts: [1, 2, 3]
                        }
                    }
                }
            };
            const result = getPage(1, state);
            expect(result).toBeJust();
            expect(result.getOrElse([])).toEqual([
                {
                    name: 'Post 1',
                    author: {
                        name: 'Author 2'
                    }
                }, {
                    name: 'Post 2',
                    author: {
                        name: 'Author 1'
                    }
                }, {
                    name: 'Post 2',
                    author: {}
                }
            ]);
        });

        it('returns Nothing when the page does not exist', () => {
            const state = {
                blog: {
                    pages: {}
                }
            };
            const getPage999 = partial(getPage, [999, state]);
            expect(getPage999).not.toThrow();
            expect(getPage999()).toBeNothing();
        });
    });

    describe('getPageHasData', () => {
        it('returns false when the page has no data', () => {
            const state = {
                blog: {
                    pages: {
                        1: {
                            posts: []
                        }
                    }
                }
            };
            const result = getPageHasData(1, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(false);
        });

        it('returns true when the page has data', () => {
            const state = {
                blog: {
                    pages: {
                        2: {
                            posts: [1, 2, 3]
                        }
                    }
                }
            };
            const result = getPageHasData(2, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(true);
        });

        it('returns Nothing when the page does not exist', () => {
            const state = {
                blog: {
                    pages: {}
                }
            };
            const getPage999IsFetching = partial(getPageHasData, [999, state]);
            expect(getPage999IsFetching).not.toThrow();
            expect(getPage999IsFetching()).toBeNothing();
        });
    });

    describe('getPostIsFetching', () => {
        it('returns false when the post is not fetching', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            1: {
                                isFetching: false
                            }
                        }
                    }
                }
            };
            const result = getPostIsFetching(1, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(false);
        });

        it('returns true when the post is fetching', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            2: {
                                isFetching: true
                            }
                        }
                    }
                }
            };
            const result = getPostIsFetching(2, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(true);
        });

        it('returns Nothing when the post does not exist', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            1: {}
                        }
                    }
                }
            };
            const getPost999IsFetching = partial(getPostIsFetching, [999, state]);
            expect(getPost999IsFetching).not.toThrow();
            expect(getPost999IsFetching()).toBeNothing();
        });
    });

    describe('getPostError', () => {
        it('returns Nothing when the post has no error', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            1: {
                                error: null
                            }
                        }
                    }
                }
            };
            const result = getPostError(1, state);
            expect(result).toBeNothing();
        });

        it('returns the error when the post has an error', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            2: {
                                error: 'Bad Request'
                            }
                        }
                    }
                }
            };
            const result = getPostError(2, state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe('Bad Request');
        });

        it('returns Nothing when the post does not exist', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {},
                        authors: {}
                    }
                }
            };
            const getPost999Error = partial(getPostError, [999, state]);
            expect(getPost999Error).not.toThrow();
            expect(getPost999Error()).toBeNothing();
        });
    });

    describe('getPost', () => {
        it('returns the post when the post exists', () => {
            const state = {
                blog: {
                    entities: {
                        posts: {
                            1: {
                                isFetching: false,
                                error: null,
                                post: {
                                    name: 'Post 1',
                                    author: 2
                                }
                            },
                            2: {
                                isFetching: false,
                                error: null,
                                post: {
                                    name: 'Post 2',
                                    author: 1
                                }
                            }
                        },
                        authors: {
                            1: {
                                name: 'Author 1'
                            },
                            2: {
                                name: 'Author 2'
                            }
                        }
                    }
                }
            };

            const result1 = getPost(1, state);
            expect(result1).toBeJust();
            expect(result1.getOrElse({})).toEqual({
                name: 'Post 1',
                author: {
                    name: 'Author 2'
                }
            });

            const result2 = getPost(2, state);
            expect(result2).toBeJust();
            expect(result2.getOrElse({})).toEqual({
                name: 'Post 2',
                author: {
                    name: 'Author 1'
                }
            });
        });

        it('returns Nothing when the post does not exist', () => {
            const state = {
                blog: {
                    entities: {
                        pages: {},
                        authors: {}
                    }
                }
            };
            const getPost999 = partial(getPost, [999, state]);
            expect(getPost999).not.toThrow();
            expect(getPost999()).toBeNothing();
        });
    });

    describe('getPagination', () => {
        it('returns Nothing when pagination does not exist', () => {
            const state = {
                blog: {
                    pagination: null
                }
            };
            const result = getPagination(state);
            expect(result).toBeNothing();
        });

        it('returns pagination when pagination exists', () => {
            const state = {
                blog: {
                    pagination: {
                        pages: 4
                    }
                }
            };
            const result = getPagination(state);
            expect(result).toBeJust();
            expect(result.getOrElse({})).toBe(state.blog.pagination);
        });
    });
});
