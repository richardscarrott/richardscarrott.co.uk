import { PropTypes } from 'react';
import factory from '../factory/Factory';
import styles from './H4.css';

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
