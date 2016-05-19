import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
    H1,
    IntroText
} from '../../../lib/typography/Typography';
import styles from './Logo.css';

function Logo({ className }) {
    return (
        <div className={classNames(styles.root, className)}>
            <H1 weight="bold">Richard Scarrott</H1>
            <IntroText>Frontend Web Developer, London</IntroText>
        </div>
    );
}

Logo.propTypes = {
    className: PropTypes.string
};

export default Logo;
