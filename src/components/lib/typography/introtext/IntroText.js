import React from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/introtext/IntroText.css';

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
