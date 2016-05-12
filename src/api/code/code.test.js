jest.unmock('./code');

import fetch from '../../utils/fetch';
import { fetchActivity } from './code';

describe('api/code/code', () => {

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockReturnValue(Promise.resolve({}));
    });

    describe('fetchActivity', () => {

        it('fetches activity', () => {
            fetchActivity();
            expect(fetch.mock.calls[0][0]).toMatch(/github\/activity/);
        });

    });

});
