import fetch from '../../utils/fetch';

export function fetchActivity() {
    return fetch(`${process.env.API_ENDPOINT}/github/activity`);
}
