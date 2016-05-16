import React from 'react';
import factory from '../factory/Factory';
import styles from './Quote.css';

export default factory('Quote', {
    styles,
    propTypes: {
        weight: React.PropTypes.oneOf([
            'regular'
        ]).isRequired
    },
    defaultProps: {
        weight: 'regular',
        elementType: 'blockquote'
    }
});
