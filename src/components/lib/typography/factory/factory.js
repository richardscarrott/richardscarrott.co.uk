import React from 'react';
import classNames from 'classnames';
import blockElements from 'block-elements';
import styles from './factory.css';

function isBlockElement(elementType) {
    return blockElements.includes(elementType);
}

// Example:
// const H1 = factory('H1', {
//     name: 'H1',
//     styles: {
//         light: 'h1 h1--light',
//         regular: 'h1 h1--regular'
//     },
//     propTypes: {
//         weight: React.PropTypes.oneOf([
//             'light',
//             'regular'
//         ]).isRequired
//     },
//     defaultProps: {
//         weight: 'regular',
//         elementType: 'h1'
//     }
// });
//
// <H1 weight="light">Hello World</H1>
function factory(name, config) {
    const propTypes = {
        elementType: React.PropTypes.string.isRequired,
        inline: React.PropTypes.bool,
        className: React.PropTypes.string,
        ...config.propTypes
    };
    const defaultProps = {
        elementType: 'div',
        inline: false,
        ...config.defaultProps
    };
    const componentStyles = {
        ...styles,
        ...config.styles
    };
    const TypographyComponent = ({ weight, inline, elementType, className, ...other }) => {
        let Type = elementType;
        if (inline && isBlockElement(Type)) {
            Type = 'span'; // Stay valid.
        }
        return (
            <Type {...other} className={classNames(className, componentStyles[weight], {
                [componentStyles.inline]: inline
            })} />
        );
    }
    TypographyComponent.propTypes = propTypes;
    TypographyComponent.defaultProps = defaultProps;
    TypographyComponent.displayName = name; // TODO: figure out why this isn't working.
    return TypographyComponent;
}

export default factory;
