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
    Code,
    ActionText,
    Copy,
    List,
    InlineCode
} from 'components/lib/typography/Typography';
import styles from 'components/kitchensink/typography/Typography.css';

function Typography({ className }) {
    return (
        <div className={classNames(styles.root, className)}>
            <Copy>
                <H1 weight="bold">This is a title</H1>
                <H2>This is a subtitle providing additional information</H2>
                <IntroText>
                     This is some intro text. <InlineCode>Inline code</InlineCode> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some intro text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                </IntroText>
                <BodyText>
                    This is some body text. <InlineCode>Inline code</InlineCode> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                </BodyText>
                <BodyText>
                    This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is some more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                </BodyText>

                <H3 weight="bold">This is a section title</H3>
                <H4>This is a section subtitle</H4>
                <BodyText>
                    This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                </BodyText>
                <List>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                    </li>
                    <li>
                        Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text.
                    </li>
                </List>
                <Code language="javascript">
                    {`alert('This probably needs to be wrapped in a <pre> tag for multi-line code.');`}
                </Code>
                <H3 weight="bold">This is a section title</H3>
                <BodyText>
                    This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                </BodyText>
                <Quote className={styles.module}>Lorem ipsum dolor sit amet, consectetur adipiscing elit &mdash; Richard Scarrott</Quote>
                <BodyText>
                    This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                </BodyText>
                <List ordered={true}>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate.
                    </li>
                    <li>
                        Diam eu pretium. This is even more body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.
                    </li>
                </List>
            </Copy>

            <hr />

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

            <List>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Cras dapibus vulputate diam eu pretium.</li>
                <li>Diam eu pretium.</li>
            </List>

            <List ordered={true}>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Cras dapibus vulputate diam eu pretium.</li>
                <li>Diam eu pretium.</li>
            </List>
        </div>
    );
}

Typography.propTypes = {
    className: PropTypes.string
};

export default Typography;
