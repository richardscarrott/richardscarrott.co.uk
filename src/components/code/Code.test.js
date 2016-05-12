jest.unmock('./Code');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Code from './Code';

describe('components/code/Code', () => {

    it('is defined', () => {
        expect(Code).toBeDefined();
    })

});
