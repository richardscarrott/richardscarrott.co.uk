import React from 'react';
import factory from '../factory/factory';
import styles from './H2.css';

export default factory('H2', {
    styles,
    propTypes: {
        weight: React.PropTypes.oneOf([
            'regular',
            'bold'
        ]).isRequired
    },
    defaultProps: {
        weight: 'regular',
        elementType: 'h2'
    }
});
