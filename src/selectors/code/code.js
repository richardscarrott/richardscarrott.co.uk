import { compose, chain, map, prop, isEmpty, not, memoize, curry } from 'ramda';
import { Maybe } from 'ramda-fantasy';

const safeProp = curry(memoize((p, obj) => Maybe(obj[p])));

const getActivity = compose(
    chain(safeProp('activity')),
    safeProp('code')
);

export const getIsFetching = compose(
    chain(safeProp('isFetching')),
    getActivity
);

export const getError = compose(
    chain(safeProp('error')),
    getActivity
);

export const getEvents = compose(
    chain(safeProp('events')),
    getActivity
);

export const getHasData = compose(
    map(
        compose(
            not,
            isEmpty
        )
    ),
    getEvents
);
