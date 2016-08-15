jest.unmock('classnames');
jest.unmock('components/lib/typography/code/Code');

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import hjs from 'highlight.js/lib/highlight';
import Code from 'components/lib/typography/code/Code';

Error.stackTraceLimit = 10;

describe('components/lib/typography/code/Code', () => {

    beforeEach(() => {
        hjs.highlight.mockClear();
        hjs.highlight.mockReturnValue({
            value: 'highlighted'
        });
        hjs.highlightAuto.mockClear();
        hjs.highlightAuto.mockReturnValue({
            value: 'highlighted auto'
        });
    });

    it('accepts a custom className', () => {
        const wrapper = shallow(
            <Code className="foo">foo</Code>
        );
        expect(wrapper.hasClass('foo')).toBe(true);
    });

    it('accepts any other prop type', () => {
        const wrapper = shallow(
            <Code title="title" data-foo="bar">foo</Code>
        );
        expect(wrapper.prop('title')).toBe('title');
        expect(wrapper.prop('data-foo')).toBe('bar');
    });

    it('renders a code element', () => {
        const wrapper = shallow(
            <Code>foo</Code>
        );
        expect(wrapper.is('code')).toBe(true);
    });

    describe('children', () => {

        it('runs ', () => {
            const wrapper = shallow(
                <Code language="css">foo</Code>
            );
            expect(hjs.highlight).toBeCalledWith('css', 'foo');
        });

    });

});
