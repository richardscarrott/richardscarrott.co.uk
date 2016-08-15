import { PropTypes } from 'react';
import factory from 'components/lib/typography/factory/factory';
import styles from 'components/lib/typography/h4/H4.css';

export default factory('H4', {
    styles,
    propTypes: {
        weight: PropTypes.oneOf([
            'regular',
            'bold'
        ]).isRequired
    },
    defaultProps: {
        weight: 'regular',
        elementType: 'h4'
    }
});
