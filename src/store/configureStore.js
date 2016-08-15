import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import fsa from 'middleware/fsa';
import rootReducer from 'reducers';

const middleware = [
    thunk
];

if (process.env.BROWSER && process.env.CLIENT_ENV !== 'production') {
    middleware.push(createLogger());
    middleware.push(fsa);
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            process.env.BROWSER
                && window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (process.env.CLIENT_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
