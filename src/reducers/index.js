import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import blog from 'reducers/blog/blog';
import code from 'reducers/code/code';
import ui from 'reducers/ui/ui';

const rootReducer = combineReducers({
    routing,
    ui,
    blog,
    code
});

export default rootReducer;
