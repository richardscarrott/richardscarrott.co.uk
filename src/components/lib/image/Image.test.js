jest.unmock('classnames');
jest.unmock('components/lib/image/Image');

import React from 'react';
import { shallow } from 'enzyme';
import Image from 'components/lib/image/Image';

Error.stackTraceLimit = 10;

describe('components/lib/image/Image', () => {

    it('accepts a custom className', () => {
        const wrapper = shallow((
            <Image src="/foo" className="foo" />
        ));
        expect(wrapper.hasClass('foo')).toBe(true);
    });

    describe('componentDidMount', () => {

        const imgMock = {
            onload: jest.fn(),
            onerror: jest.fn(),
            complete: false,
            src: void 0
        };

        beforeEach(() => {
            spyOn(document, 'createElement').and.callFake(element => {
                expect(element).toBe('img');
                return imgMock
            });
        });

        it('renders the image when is successfully loads', () => {
            const wrapper = shallow(
                <Image src="/foo" />
            );
            wrapper.instance().componentDidMount();
            expect(wrapper.find('.spinner').length).toBe(1);
            expect(wrapper.find('.image').length).toBe(0);
            imgMock.onload();
            wrapper.update();
            expect(wrapper.find('.spinner').length).toBe(0);
            expect(wrapper.find('.image').length).toBe(1);
        });

        it('renders an error when the image fails to load', () => {
            const wrapper = shallow(
                <Image src="/foo" />
            );
            wrapper.instance().componentDidMount();
            expect(wrapper.find('.spinner').length).toBe(1);
            expect(wrapper.find('.error').length).toBe(0);
            imgMock.onerror();
            wrapper.update();
            expect(wrapper.find('.spinner').length).toBe(0);
            expect(wrapper.find('.error').length).toBe(1);
        });

    });

});
