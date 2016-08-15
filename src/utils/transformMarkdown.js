import React from 'react';
import url from 'url';
import {
    H1,
    H2,
    H3,
    H4,
    IntroText,
    BodyText,
    ActionText,
    Quote,
    Code,
    List,
    InlineCode
} from 'components/lib/typography/Typography';
import Image from 'components/lib/image/Image';
import remark from 'remark';
import reactRenderer from 'remark-react';

const EXCERPT_SEPARATOR = '<!-- more -->';

// TODO: Strip html-style comments (ghost admin appears to do this).
const renderer = remark().use(reactRenderer, {
    remarkReactComponents: {
        h1: props => <H1 weight="bold" {...props} />,
        h2: H2,
        h3: props => <H3 weight="bold" {...props} />,
        h4: H4,
        h5: IntroText,
        p: BodyText,
        a: ActionText,
        blockquote: Quote,
        img: ({ src, ...other }) => <Image {...other} src={src} aspectRatio={url.parse(src, true).query.ratio} />,
        code: ({ className, ...other }) => <Code {...other} language={(className || '').split('-')[1]} />,
        inlineCode: InlineCode,
        ul: List,
        ol: props => <List {...props} ordered={true} />
    }
});

function transformMarkdown(markdown, excerpt) {
    let input = excerpt ? markdown.split(EXCERPT_SEPARATOR)[0] : markdown;
    input = input.replace(EXCERPT_SEPARATOR, '');
    return renderer.process(input);
}

export default transformMarkdown;
