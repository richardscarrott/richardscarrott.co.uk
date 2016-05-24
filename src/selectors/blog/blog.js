import { __, curry, compose, chain, map, slice, apply, lift, flip, merge, identity, filter, unnest, not, isEmpty, memoize } from 'ramda';
import { Maybe, Identity } from 'ramda-fantasy';
import { createSelector } from 'reselect';

const safeProp = curry(memoize((p, obj) => Maybe(obj[p])));

const ignoreFirstArg = fn => (...args) => apply(fn, slice(1, Infinity, args));

const filterNothing = filter(
    compose(
        not,
        Maybe.isNothing
    )
);

const getBlog = safeProp('blog');

const getEntities = compose(
    chain(safeProp('entities')),
    getBlog
);

const getPosts = compose(
    chain(safeProp('posts')),
    getEntities
);

const getPost = curry((id, state) => {
    return compose(
        chain(safeProp(id)),
        getPosts
    )(state);
});

const getAuthors = compose(
    chain(safeProp('authors')),
    getEntities
);

const getPages = compose(
    chain(safeProp('pages')),
    getBlog
);

const getPage = curry((page, state) => {
    return compose(
        chain(safeProp(page)),
        getPages
    )(state);
});

const getPagePosts = compose(
    chain(safeProp('posts')),
    getPage
);

export const getPageIsFetching = compose(
    chain(safeProp('isFetching')),
    getPage
);

export const getPageError = compose(
    chain(safeProp('error')),
    getPage
);

const combinePost = curry((posts, authors, id) => {
    const post = compose(
        chain(safeProp('post')),
        chain(safeProp(id))
    )(posts);
    const author = compose(
        chain(
            chain(flip(safeProp), authors)
        ),
        chain(safeProp('author'))
    )(post);

    return map(merge(__, {
        author: author.getOrElse({})
    }), post);
});

const getPageCombined = createSelector(
    ignoreFirstArg(getPosts),
    ignoreFirstArg(getAuthors),
    getPagePosts,
    (posts, authors, pagePosts) => {
        return map(
            compose(
                filterNothing,
                map(
                    compose(
                        unnest,
                        combinePost(posts, authors)
                    )
                )
            ),
            pagePosts
        );
    }
);

export { getPageCombined as getPage };

export const getPageHasData = compose(
    map(
        compose(
            not,
            isEmpty
        )
    ),
    getPagePosts
);

export const getPostIsFetching = compose(
    chain(safeProp('isFetching')),
    getPost
);

export const getPostError = compose(
    chain(safeProp('error')),
    getPost
);

const getPostCombined = createSelector(
    ignoreFirstArg(getPosts),
    ignoreFirstArg(getAuthors),
    identity,
    combinePost
);

export { getPostCombined as getPost };

export const getPagination = compose(
    chain(safeProp('pagination')),
    getBlog
);
