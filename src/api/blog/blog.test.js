jest.unmock('./blog');
jest.unmock('normalizr');

import fetch from '../../utils/fetch';
import NetworkError from '../../utils/NetworkError';
import { fetchPosts } from './blog';

describe('api/blog/blog', () => {

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockReturnValue(Promise.resolve({
            posts: [{}]
        }));
    });

    describe('fetchPosts', () => {

        it('fetches the page', () => {
            fetchPosts(1);
            expect(fetch.mock.calls[0][0]).toMatch(/page=1/);
            fetchPosts(2);
            expect(fetch.mock.calls[1][0]).toMatch(/page=2/);
        });

        pit('normalizes the response', () => {
            const data = {
                posts: [
                    {
                        slug: '/post-1/',
                        name: 'Post 1',
                        author: {
                            id: 1,
                            name: 'Author 1'
                        }
                    },
                    {
                        slug: '/post-2/',
                        name: 'Post 2',
                        author: {
                            id: 1,
                            name: 'Author 1'
                        }
                    },
                    {
                        slug: '/post-3/',
                        name: 'Post 3',
                        author: {
                            id: 2,
                            name: 'Author 2'
                        }
                    }
                ]
            };
            fetch.mockReturnValue(Promise.resolve(data));
            return fetchPosts(1)
                .then(response => {
                    expect(response).toEqual({
                        entities: {
                            posts: {
                                '/post-1/': {
                                    slug: '/post-1/',
                                    name: 'Post 1',
                                    author: 1
                                },
                                '/post-2/': {
                                    slug: '/post-2/',
                                    name: 'Post 2',
                                    author: 1
                                },
                                '/post-3/': {
                                    slug: '/post-3/',
                                    name: 'Post 3',
                                    author: 2
                                }
                            },
                            authors: {
                                1: {
                                    id: 1,
                                    name: 'Author 1'
                                },
                                2: {
                                    id: 2,
                                    name: 'Author 2'
                                }
                            }
                        },
                        result: {
                            posts: ['/post-1/', '/post-2/', '/post-3/']
                        }
                    });
                });
        });

        pit('errors when no posts are returned', () => {
            const data = {
                posts: []
            };
            fetch.mockReturnValue(Promise.resolve(data));
            return fetchPosts(1)
                .then(() => {
                    fail('Expected Promise to be rejected');
                }, error => {
                    expect(error).toBeInstanceOf(NetworkError);
                });
        });

    });

});
