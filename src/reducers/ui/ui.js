import { combineReducers } from 'redux';
import {
    START_ACTIVITY,
    END_ACTIVITY
} from '../../actions/ui/ui';

function activity(state = 0, action) {
    switch(action.type) {
        case START_ACTIVITY:
            return ++state;
        case END_ACTIVITY:
            return --state;
        default:
            return state;
    }
}

const ui = combineReducers({
    activity
});

export default ui;
