'use strict';

const express = require('express');
const fetch = require('isomorphic-fetch');
const xml2js = require('xml2js');
const cheerio = require('cheerio');
const moment = require('moment');
const router = express.Router();

const API_ENDPOINT = 'https://github.com';
const FEED_BASE_PATH = 'https://github.com';

function formatHtml(html) {
    const $ = cheerio.load(html);
    const $relativeTime = $('relative-time');
    const datetime = $relativeTime.attr('datetime');
    const dateTimeFromNow = moment(datetime).fromNow();
    $relativeTime.replaceWith(`<span class="relative-time">${dateTimeFromNow}</span>`);
    $('a').each(function() {
        const $el = $(this);
        const href = $el.attr('href');
        if (/^\//.test(href)) {
            $el.attr('href', `${FEED_BASE_PATH}${href}`);
        }
        $el.attr('target', '_blank');
    });
    return $.html();
}

function formatResult(result) {
    return result.feed.entry.map(entry => {
        return {
            id: entry.id[0],
            // Feed doesn't have an xml:base so just hard code it...
            html: formatHtml(entry.content[0]._)
        };
    });
}

function xmlToJs(str) {
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
        parser.parseString(str, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

/**
 * Unfortunately Github caters for two extremes when getting public activity:
 *     1) Get the raw events - https://developer.github.com/v3/activity/events/
 *     2) Get the pre-formatted events as an atom feed - https://github.com/richardscarrott.atom
 * It's too much work to turn all the different raw event types into something
 * readable so this simply makes the atom feed more consumable.
 */
router.get('/activity', (req, res, next) => {
    fetch(`${API_ENDPOINT}/richardscarrott`, {
        headers: {
            'Accept': 'application/atom+xml'
        }
    })
    .then(response => response.text())
    .then(xmlToJs)
    .then(formatResult)
    .then(
        result => res.send(result),
        err => next(err)
    );
});

module.exports = router;
