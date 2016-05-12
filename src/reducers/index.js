import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import blog from './blog/blog';
import code from './code/code';

const rootReducer = combineReducers({
    blog,
    code,
    routing: routerReducer
});

export default rootReducer;
