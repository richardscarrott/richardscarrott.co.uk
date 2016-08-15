import React from 'react';
import classNames from 'classnames';
import styles from 'components/lib/typography/inlinecode/InlineCode.css';

function InlineCode({ className, ...other }) {
    return (
        <code {...other} className={classNames(className, styles.root)} />
    )
}

export default InlineCode;
