import React from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/quote/Quote.css';

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
