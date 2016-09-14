export function trackEvent(...args) {
    if (process.env.BROWSER && window.ga) {
        window.ga('send', 'event', ...args);
    }
}
