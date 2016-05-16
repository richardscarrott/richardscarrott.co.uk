import { PropTypes } from 'react';
import factory from '../factory/Factory';
import styles from './H3.css';

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
