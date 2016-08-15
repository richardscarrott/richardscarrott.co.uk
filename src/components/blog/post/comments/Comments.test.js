jest.unmock('classnames');
jest.unmock('components/blog/post/comments/Comments');

import React from 'react';
import ReactDisqusThread from 'react-disqus-thread';
import { shallow } from 'enzyme';
import Comments from 'components/blog/post/comments/Comments';

Error.stackTraceLimit = 10;

describe('components/blog/post/comments/Comments', () => {

    it('accepts a custom className', () => {
        const wrapper = shallow(
            <Comments id={1} title="foo" className="bar" />
        );
        expect(wrapper.hasClass('bar')).toBe(true);
    });

    it('renders ReactDisqusThread', () => {
        const shortname = process.env.DISQUS_SHORTNAME;
        process.env.DISQUS_SHORTNAME = 'shortname';
        const wrapper = shallow(
            <Comments id={2} title="title" />
        );
        const reactDisqusThread = wrapper.find(ReactDisqusThread);
        expect(reactDisqusThread.length).toBe(1);
        expect(reactDisqusThread.prop('shortname')).toBe('shortname');
        expect(reactDisqusThread.prop('identifier')).toBe('blog-post-2');
        expect(reactDisqusThread.prop('title')).toBe('title');
        process.env.DISQUS_SHORTNAME = shortname;
    });

});
