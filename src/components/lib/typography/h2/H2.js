import React from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/h2/H2.css';

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
