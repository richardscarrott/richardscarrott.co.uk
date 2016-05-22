import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import blog from './blog/blog';
import code from './code/code';
import ui from './ui/ui';

const rootReducer = combineReducers({
    routing,
    ui,
    blog,
    code
});

export default rootReducer;
