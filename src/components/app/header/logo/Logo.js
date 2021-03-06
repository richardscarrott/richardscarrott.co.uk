import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
    H1,
    IntroText
} from 'components/lib/typography/Typography';
import styles from 'components/app/header/logo/Logo.css';

function Logo({ className }) {
    return (
        <div className={classNames(styles.root, className)}>
            <H1 weight="bold" elementType="p">Richard Scarrott</H1>
            <IntroText>Frontend Web Developer, London</IntroText>
        </div>
    );
}

Logo.propTypes = {
    className: PropTypes.string
};

export default Logo;
