import { normalize, Schema, arrayOf } from 'normalizr';
import fetch from '../../utils/fetch';
import NetworkError from '../../utils/NetworkError';

const posts = new Schema('posts', {
    idAttribute: 'slug'
});
const author = new Schema('authors');

posts.define({
    author
});

export function fetchPosts(page) {
    return fetch(`${process.env.GHOST_API_ENDPOINT}/posts/?client_id=${process.env.GHOST_API_CLIENT_ID}&client_secret=${process.env.GHOST_API_CLIENT_SECRET}&page=${page}&include=author`)
        .then(response => {
            // Ghost API does't return an error response if the page doesn't exit, nice.
            if (!response.posts.length) {
                throw new NetworkError('Bad Request', 400);
            }
            return normalize(response, {
                posts: arrayOf(posts)
            });
        });
}

export function fetchPost(slug) {
    return fetch(`${process.env.GHOST_API_ENDPOINT}/posts/slug/${slug}/?client_id=${process.env.GHOST_API_CLIENT_ID}&client_secret=${process.env.GHOST_API_CLIENT_SECRET}&include=author`)
        .then(response => {
            return normalize(response, {
                posts: arrayOf(posts)
            });
        });
}
