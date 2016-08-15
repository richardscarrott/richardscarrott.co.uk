import { PropTypes } from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/h3/H3.css';

export default factory('H3', {
    styles,
    propTypes: {
        weight: PropTypes.oneOf([
            'regular',
            'bold'
        ]).isRequired
    },
    defaultProps: {
        weight: 'regular',
        elementType: 'h3'
    }
});
