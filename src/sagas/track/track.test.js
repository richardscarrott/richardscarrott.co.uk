jest.unmock('sagas/track/track');
jest.unmock('redux-saga/effects');

import { take, call } from 'redux-saga/effects';
import { trackEvent } from 'utils/track';
import { watchTrack, shouldTrack } from 'sagas/track/track';

describe('sagas/track/track', () => {

    describe('watchTrack', () => {

        it('tracks an event', () => {
            const gen = watchTrack();
            expect(gen.next().value).toEqual(take(shouldTrack));
            expect(gen.next({
                type: 'FOO'
            }).value).toEqual(call(trackEvent, 'Action', 'FOO'));
        });

    });

    describe('shouldTrack', () => {

        it('returns true if action indicates it should track', () => {
            expect(shouldTrack({
                meta: {
                    track: true
                }
            })).toEqual(true);
        });

        it('returns false if action does not indicate it should track', () => {
            expect(shouldTrack({})).toEqual(false);
            expect(shouldTrack({
                meta: {}
            })).toEqual(false);
            expect(shouldTrack({
                meta: {
                    track: false
                }
            })).toEqual(false);
        });

    });

});
