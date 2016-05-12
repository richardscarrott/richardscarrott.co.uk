import { isFSA } from 'flux-standard-action';

const fsa = store => next => action => {
    if (!isFSA(action)) {
        console.warn(`${action && action.type ? action.type : 'Action'} is not FSA compliant.`, action);
    }
    next(action);
}

export default fsa;
