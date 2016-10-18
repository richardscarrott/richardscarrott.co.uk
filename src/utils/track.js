export function trackEvent(...args) {
    if (process.env.BROWSER === 'true' && window.ga) {
        window.ga('send', 'event', ...args);
    }
}
