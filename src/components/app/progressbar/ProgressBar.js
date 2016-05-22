import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react/lib/ReactCssTransitionGroup';
import classNames from 'classnames';
import { TransitionMotion, Motion, spring, presets } from 'react-motion';
import styles from './ProgressBar.css';

// style={{
//    width: `${percentage}%`
// }}

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: false,
            animate: true,
            complete: false
        };
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if (!nextProps.active && this.props.active) {
            const rootWidth = ReactDOM.findDOMNode(this).clientWidth;
            const fillWidth = (parseInt(window.getComputedStyle(this.refs.fill).getPropertyValue('width'), 10) / rootWidth) * 100
            this.setState({
                animate: false,
                width: fillWidth
            }, () => {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.setState({
                        width: false,
                        complete: true
                    });
                }, 0);
            });
        } else if (nextProps.active && !this.props.active) {
            this.setState({
                width: false,
                animate: true,
                complete: false
            });
        }
    }

    render() {
        const { className } = this.props;
        const { width, animate, complete } = this.state;
        return (
            <div className={classNames(styles.root, {
                [styles.animate]: animate,
                [styles.complete]: complete
            }, className)}>
                <span ref="fill" className={styles.fill} style={{
                    width: width ? `${width}%` : ''
                }} />
            </div>
        );
    }

}

// function ProgressBar({ active, className }) {
//     return (
//         <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={750} transitionLeaveTimeout={750}>
//             {active ? (
//                 <div className={classNames(styles.root, className)}>
//                     <span className={styles.fill} />
//                 </div>
//             ) : null}
//         </ReactCSSTransitionGroup>
//     );
// }

// function ProgressBar({ active, className }) {

//     // const defaultStyle = {
//     //     width: 0
//     // };

//     // const style = active ? {
//     //     width: spring(90),
//     //     // opacity: 1
//     // } : {
//     //     width: spring(100),
//     //     // opacity: spring(0),
//     // };

//     // stiffness: optional, defaults to 170.
//     // damping: optional, defaults to 26.
//     // precision: optional, defaults to 0.01. Specifies both the rounding of the interpolated value and the speed

//     return (
//         <TransitionMotion
//             willLeave={() => {
//                 console.log('Will leave')
//                 return {
//                     width: spring(100, {
//                         stiffness: 120,
//                         damping: 26
//                     }),
//                     opacity: spring(0, {
//                         stiffness: 120,
//                         damping: 26
//                     })
//                 };
//             }}
//             willEnter={() => {
//                 console.log('Will enter')
//                 return {
//                     width: 0,
//                     opacity: 1
//                 };
//             }}
//             defaultStyles={[{
//                 key: 1,
//                 style: {
//                     width: 0,
//                     opacity: 1
//                 }
//             }]}
//             styles={interpolatedStyles => {
//                 const style = interpolatedStyles[0] && interpolatedStyles[0].style || {
//                     width: 0
//                 };
//                 // TODO: change width to + 10% in this case.
//                 let width = style.width > 80
//                     ? 0 : 80;

//                 // Maybe stop the opacity spring (reset back to 0) if starting again.
//                 // if () {

//                 // }

//                 return active ? [{
//                     key: 1,
//                     style: {
//                         width: spring(width, {
//                             stiffness: 120,
//                             damping: 26
//                         }),
//                         opacity: 1
//                     }
//                 }] : [];
//             }}>
//             {interpolatedStyles => {
//                 if (interpolatedStyles.length) {
//                     const { key, data, style } = interpolatedStyles[0];
//                     return (
//                         <div className={classNames(styles.root, className)}>
//                             <span className={styles.fill} key={key} style={{
//                                 width: `${style.width}%`,
//                                 opacity: style.opacity
//                             }} />
//                         </div>
//                     );
//                 }
//                 return null;
//             }}
//         </TransitionMotion>
//     );
// }

ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired,
    className: PropTypes.string
};

export default ProgressBar;
