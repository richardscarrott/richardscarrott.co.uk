jest.unmock('classnames');
jest.unmock('./ActionText');

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import ActionText from './ActionText';

Error.stackTraceLimit = 10;

describe('components/lib/typography/actiontext/ActionText', () => {

    it('accepts a custom className', () => {
        const wrapper = shallow(
            <ActionText className="foo" />
        );
        expect(wrapper.hasClass('foo')).toBe(true);
    });

    it('accepts any other prop type', () => {
        const wrapper = shallow(
            <ActionText title="title" data-foo="bar" />
        );
        expect(wrapper.prop('title')).toBe('title');
        expect(wrapper.prop('data-foo')).toBe('bar');
    });

    it('defaults to a span element', () => {
        const wrapper = shallow(
            <ActionText />
        );
        expect(wrapper.is('span')).toBe(true);
    });

    describe('to', () => {

        it('renders a `Link` component', () => {
            const wrapper = shallow(
                <ActionText to="/foo" />
            );
            expect(wrapper.is(Link)).toBe(true);
        });

    });

    describe('href', () => {

        it('renders an `a` element', () => {
            const wrapper = shallow(
                <ActionText href="https://www.foo.com" />
            );
            expect(wrapper.is('a')).toBe(true);
        });

    });

    describe('type', () => {

        it('renders a button element when `submit` to submit a form', () => {
            const wrapper = shallow(
                <ActionText type="submit" />
            );
            expect(wrapper.is('button')).toBe(true);
        });

        it('renders a span element when not `submit`', () => {
            const wrapper = shallow(
                <ActionText type="foo" />
            );
            expect(wrapper.is('span')).toBe(true);
        });

    });

});
