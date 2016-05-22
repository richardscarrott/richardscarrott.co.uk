export const START_ACTIVITY = 'START_ACTIVITY';
export const END_ACTIVITY = 'END_ACTIVITY';

export function startActivity() {
    return {
        type: START_ACTIVITY
    };
}

export function endActivity() {
    return {
        type: END_ACTIVITY
    };
}
