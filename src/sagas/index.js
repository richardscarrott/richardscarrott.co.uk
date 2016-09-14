import { fork } from 'redux-saga/effects';
import { watchTrack } from 'sagas/track/track';

export default function* rootSaga() {
    yield [
        fork(watchTrack)
    ]
}
