jest.unmock('actions/ui/ui');

import {
    START_ACTIVITY,
    END_ACTIVITY,
    startActivity,
    endActivity
} from 'actions/ui/ui';

describe('actions/ui/ui', () => {

    describe('startActivity', () => {

        it('creates START_ACTIVITY', () => {
            const action = startActivity();
            expect(action).toBeFSA();
            expect(action).toEqual({
                type: START_ACTIVITY
            });
        });

    });

    describe('endActivity', () => {

        it('creates END_ACTIVITY', () => {
            const action = endActivity();
            expect(action).toBeFSA();
            expect(action).toEqual({
                type: END_ACTIVITY
            });
        });

    });

});
