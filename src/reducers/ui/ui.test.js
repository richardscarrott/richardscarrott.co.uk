jest.unmock('reducers/ui/ui');

import reducer from 'reducers/ui/ui';
import {
    START_ACTIVITY,
    END_ACTIVITY
} from 'actions/ui/ui';

describe('reducers/ui/ui', () => {

    it('returns the initial state', () => {
        expect(
            reducer(void 0, {})
        ).toEqual({
            activity: 0
        });
    });

    it('handles START_ACTIVITY', () => {
        const action = {
            type: START_ACTIVITY
        };
        const state = {
            activity: 3
        };
        expect(
            reducer(state, action)
        ).toEqual({
            activity: 4
        });
    });

    it('handles END_ACTIVITY', () => {
        const action = {
            type: END_ACTIVITY
        };
        const state = {
            activity: 4
        };
        expect(
            reducer(state, action)
        ).toEqual({
            activity: 3
        });
    });

});
