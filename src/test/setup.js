import { Maybe } from 'ramda-fantasy';
import { isFSA } from 'flux-standard-action';

const getInstanceName = instance => instance && instance.constructor ? instance.constructor.name : instance;
const getConstructorName = constructor => constructor ? constructor.name : constructor;

const matchers = {
    toBeInstanceOf() {
        return {
            compare(actual, expected) {
                const result = {
                    pass: actual instanceof expected
                };
                const actualName = getInstanceName(actual);
                const expectedName = getConstructorName(expected);
                if (result.pass) {
                    result.message = `Expected ${actualName} NOT to be an instance of ${expectedName}`;
                } else {
                    result.message = `Expected ${actualName} to be an instance of ${expectedName}`;
                }
                return result;
            }
        };
    },

    toBeJust() {
        return {
            compare(actual, expected) {
                const result = {
                    pass: Maybe.isJust(actual)
                };
                const actualName = getInstanceName(actual);
                if (result.pass) {
                    result.message = `Expected ${actualName} NOT to be a Maybe`;
                } else {
                    result.message = `Expected ${actualName} to be a Just`;
                }
                return result;
            }
        };
    },

    toBeNothing() {
        return {
            compare(actual, expected) {
                const result = {
                    pass: Maybe.isNothing(actual)
                };
                const actualName = getInstanceName(actual);
                if (result.pass) {
                    result.message = `Expected ${actualName} NOT to be a Nothing`;
                } else {
                    result.message = `Expected ${actualName} to be a Nothing`;
                }
                return result;
            }
        };
    },

    toBeFSA() {
        return {
            compare(actual) {
                const result = {
                    pass: isFSA(actual)
                };
                if (result.pass) {
                    result.message = `Expected ${actual} NOT to be FSA compliant`;
                } else {
                    result.message = `Expected ${actual} to be FSA compliant`;
                }
                return result;
            }
        };
    }
};

beforeEach(() => {
    jasmine.addMatchers(matchers);
});
