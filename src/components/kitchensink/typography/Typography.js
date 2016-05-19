import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
    H1,
    H2,
    H3,
    H4,
    IntroText,
    BodyText,
    Quote,
    ActionText
} from '../../lib/typography/Typography';
import styles from './Typography.css';

function Typography({ className }) {
    return (
        <div className={classNames(styles.root, className)}>
            <H1 className={styles.module}>Heading 1 Regular</H1>
            <H1 weight="bold" elementType="h2" className={styles.module}>Heading 1 Bold</H1>

            <H2 className={styles.module}>Heading 2 Regular</H2>
            <H2 weight="bold" className={styles.module}>Heading 2 Bold</H2>

            <H3 className={styles.module}>Heading 3 Regular</H3>
            <H3 weight="bold" className={styles.module}>Heading 3 Bold</H3>

            <H4 className={styles.module}>Heading 4 Regular</H4>
            <H4 weight="bold" className={styles.module}>Heading 4 Bold</H4>

            <H4 className={styles.module}>
                <ActionText href="http://richardscarrott.co.uk">
                    Heading 4 Regular w/ Action Text
                </ActionText>
            </H4>
            <H4 weight="bold" className={styles.module}>
                <ActionText to="/code">
                    Heading 4 Regular w/ Action Text
                </ActionText>
            </H4>

            <IntroText className={styles.module}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
            </IntroText>

            <IntroText weight="bold" className={styles.module}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
            </IntroText>

            <BodyText className={styles.module}>
                Body text lorem ipsum dolor sit amet, <ActionText onClick={() => alert('Clicked <ActionText />')}>consectetur adipiscing elit</ActionText>, sed do eiusmod tempor incididunt ut. <BodyText weight="bold" inline>Excepteur sint occaecat cupidatat non proident</BodyText> sunt in culpa qui officia deserunt mollit anim id est laborum. Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <ActionText to="/code">ullamco laboris nisi</ActionText> ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <ActionText href="http://richardscarrott.co.uk">voluptate velit</ActionText> esse cillum dolore eu fugiat nulla pariatur.
            </BodyText>

            <Quote className={styles.module}>Lorem ipsum dolor sit amet, consectetur adipiscing elit &mdash; Richard Scarrott</Quote>
        </div>
    );
}

Typography.propTypes = {
    className: PropTypes.string
};

export default Typography;
