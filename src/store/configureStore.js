import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import fsa from 'middleware/fsa';
import rootSaga from 'sagas';
import rootReducer from 'reducers';

const sagaMiddleware = createSagaMiddleware()

const middleware = [
    thunk,
    sagaMiddleware
];

if (process.env.BROWSER === 'true' && process.env.CLIENT_ENV !== 'production') {
    middleware.push(createLogger());
    middleware.push(fsa);
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            process.env.BROWSER === 'true'
                && window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    sagaMiddleware.run(rootSaga);

    if (process.env.CLIENT_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
