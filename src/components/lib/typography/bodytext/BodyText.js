import React from 'react';
import factory from '../factory/factory';
import styles from './BodyText.css';

export default factory('BodyText', {
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
