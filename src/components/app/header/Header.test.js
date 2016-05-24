jest.unmock('classnames');
jest.unmock('./Header');

import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import Header from './Header';

Error.stackTraceLimit = 10;

describe('components/app/header/Header', () => {

    it('accepts a custom className', () => {
        const wrapper = shallow(
            <Header className="foo" />
        );
        expect(wrapper.hasClass('foo')).toBe(true);
    });

    it('accepts any other prop type', () => {
        const wrapper = shallow(
            <Header title="title" data-foo="bar" />
        );
        expect(wrapper.prop('title')).toBe('title');
        expect(wrapper.prop('data-foo')).toBe('bar');
    });

});
