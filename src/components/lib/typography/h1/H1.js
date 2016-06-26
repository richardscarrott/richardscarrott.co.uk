import React from 'react';
import factory from '../factory/factory';
import styles from './H1.css';

export default factory('H1', {
    styles,
    propTypes: {
        weight: React.PropTypes.oneOf([
            'regular',
            'bold'
        ]).isRequired
    },
    defaultProps: {
        weight: 'regular',
        elementType: 'h1'
    }
});
