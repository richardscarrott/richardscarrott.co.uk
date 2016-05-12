jest.unmock('./code');

import {
    getIsFetching,
    getError,
    getEvents,
    getHasData
} from './code';

describe('selectors/code/code', () => {

    describe('getIsFetching', () => {
        it('returns false when not fetching', () => {
            const state = {
                code: {
                    activity: {
                        isFetching: false
                    }
                }
            };
            const result = getIsFetching(state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(false);
        });

        it('returns true when fetching', () => {
            const state = {
                code: {
                    activity: {
                        isFetching: true
                    }
                }
            };
            const result = getIsFetching(state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(true);
        });
    });

    describe('getError', () => {
        it('returns Nothing when there is no error', () => {
            const state = {
                code: {
                    activity: {
                        error: null
                    }
                }
            };
            const result = getError(state);
            expect(result).toBeNothing();
        });

        it('returns the error when there is an error', () => {
            const state = {
                code: {
                    activity: {
                        error: 'Bad Request'
                    }
                }
            };
            const result = getError(state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe('Bad Request');
        });
    });

    describe('getEvents', () => {
        it('returns Nothing when there are no events', () => {
            const state = {
                code: {
                    activity: {
                        events: null
                    }
                }
            };
            const result = getEvents(state);
            expect(result).toBeNothing();
        });

        it('returns the events when there are events', () => {
            const state = {
                code: {
                    activity: {
                        events: [{
                            name: 'Event 1'
                        }, {
                            name: 'Event 2'
                        }]
                    }
                }
            };
            const result = getEvents(state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toEqual([{
                name: 'Event 1'
            }, {
                name: 'Event 2'
            }]);
        });
    });

    describe('getHasData', () => {
        it('returns false when events is null', () => {
            const state = {
                code: {
                    activity: {
                        events: null
                    }
                }
            };
            const result = getHasData(state);
            expect(result).toBeNothing();
        });

        it('returns false when there are no events', () => {
            const state = {
                code: {
                    activity: {
                        events: []
                    }
                }
            };
            const result = getHasData(state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(false);
        });

        it('returns the true when there are events', () => {
            const state = {
                code: {
                    activity: {
                        events: [{
                            name: 'Event 1'
                        }, {
                            name: 'Event 2'
                        }]
                    }
                }
            };
            const result = getHasData(state);
            expect(result).toBeJust();
            expect(result.getOrElse(null)).toBe(true);
        });
    });

});
