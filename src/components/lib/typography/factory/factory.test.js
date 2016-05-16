jest.unmock('classnames');
jest.unmock('block-elements');
jest.unmock('./Factory');

import React from 'react';
import { shallow } from 'enzyme';
import factory from './Factory';

Error.stackTraceLimit = 10;

describe('components/lib/typography/factory/Factory', () => {

    let TestComponent;

    beforeEach(() => {
        TestComponent = factory('TestComponent', {
            name: 'TestComponent',
            styles: {
                light: 'TestComponent--light',
                regular: 'TestComponent--regular'
            },
            propTypes: {
                weight: React.PropTypes.oneOf([
                    'light',
                    'regular'
                ]).isRequired
            },
            defaultProps: {
                weight: 'regular',
                elementType: 'h1'
            }
        });
    });

    describe('weight', () => {

        it('defaults to `regular`', () => {
            const wrapper = shallow(
                <TestComponent />
            );
            expect(wrapper.hasClass('TestComponent--regular')).toBe(true);
        });

        it('accepts `regular`', () => {
            const wrapper = shallow(
                <TestComponent weight="regular" />
            );
            expect(wrapper.hasClass('TestComponent--regular')).toBe(true);
        });

        it('accepts `light`', () => {
            const wrapper = shallow(
                <TestComponent weight="light" />
            );
            expect(wrapper.hasClass('TestComponent--light')).toBe(true);
        });

    });

    describe('inline', () => {

        it('defaults to `false`', () => {
            const wrapper = shallow(
                <TestComponent />
            );
            expect(wrapper.hasClass('inline')).toBe(false);
        });

        it('accepts `false`', () => {
            const wrapper = shallow(
                <TestComponent inline={false} />
            );
            expect(wrapper.hasClass('inline')).toBe(false);
        });

        it('accepts `true`', () => {
            const wrapper = shallow(
                <TestComponent inline />
            );
            expect(wrapper.hasClass('inline')).toBe(true);
        });

    });

    describe('elementType', () => {

        it('defaults to `h1`', () => {
            const wrapper = shallow(
                <TestComponent />
            );
            expect(wrapper.is('h1')).toBe(true);
        });

        it('accepts any valid element', () => {
            const wrapper = shallow(
                <TestComponent elementType="h2" />
            );
            expect(wrapper.is('h2')).toBe(true);
        });

        it('accepts inline element types when `inline` is used', () => {
            const wrapper = shallow(
                <TestComponent inline elementType="span" />
            );
            expect(wrapper.is('span')).toBe(true);
        });

        it('does not accept block element types when `inline` is used', () => {
            const wrapper = shallow(
                <TestComponent inline elementType="div" />
            );
            expect(wrapper.is('span')).toBe(true);
        });

    });

    it('accepts a custom className', () => {
        const wrapper = shallow(
            <TestComponent className="foo" />
        );
        expect(wrapper.hasClass('foo')).toBe(true);
    });

    it('accepts any other prop type', () => {
        const wrapper = shallow(
            <TestComponent title="title" data-foo="bar" />
        );
        expect(wrapper.prop('title')).toBe('title');
        expect(wrapper.prop('data-foo')).toBe('bar');
    });

});
