import React from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/h1/H1.css';

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
