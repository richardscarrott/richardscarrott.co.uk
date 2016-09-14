import { take, call } from 'redux-saga/effects';
import { trackEvent } from 'utils/track';

export function shouldTrack({ meta }) {
    return !!(meta && meta.track);
}

export function* watchTrack() {
    const { type } = yield take(shouldTrack);
    yield call(trackEvent, 'Action', type);
}
