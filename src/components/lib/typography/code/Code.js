import React, { PropTypes } from 'react';
import classNames from 'classnames';
import hjs from 'highlight.js/lib/highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/zenburn.css';
import styles from './Code.css';

hjs.registerLanguage('javascript', javascript);
hjs.registerLanguage('css', css);
hjs.registerLanguage('xml', xml);

function Code({ language, children, className, ...other }) {
    console.log(language, children);
    const result = language ? hjs.highlight(language, children) : hjs.highlightAuto(children);
    return (
        <code {...other} className={classNames(styles.root, className, 'hljs', language)} dangerouslySetInnerHTML={{
            __html: result.value
        }} />
    );
}

Code.propTypes = {
    language: PropTypes.string,
    children: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Code;
