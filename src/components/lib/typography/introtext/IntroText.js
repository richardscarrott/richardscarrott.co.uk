import React from 'react';
import factory from '../factory/factory';
import styles from './IntroText.css';

export default factory('IntroText', {
    styles,
    propTypes: {
        weight: React.PropTypes.oneOf([
            'regular',
            'bold'
        ]).isRequired
    },
    defaultProps: {
        weight: 'regular',
        elementType: 'p'
    }
});
