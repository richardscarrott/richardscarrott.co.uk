import React from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/bodytext/BodyText.css';

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
