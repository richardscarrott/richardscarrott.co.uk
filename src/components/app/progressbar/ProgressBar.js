import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import mat4CSSParse from 'mat4-css-parse';
import styles from './ProgressBar.css';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleX: false,
            animate: props.active,
            complete: !props.active
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.active && this.props.active) {
            // 'active => inactive'
            const fillWidth = mat4CSSParse(window.getComputedStyle(this.refs.fill).getPropertyValue('transform'));
            this.setState({
                animate: false,
                scaleX: fillWidth[0] + 5 // Take into account the cost of now -> dom update (i.e. animation runs off the ui thread)
            }, () => {
                clearTimeout(this.timeout);
                // Set to complete in next tick for transition.
                this.timeout = setTimeout(() => {
                    this.setState({
                        scaleX: false,
                        complete: true
                    });
                }, 0);
            });
        } else if (nextProps.active && !this.props.active) {
            clearTimeout(this.timeout);
            // 'inactive => active'
            this.setState({
                scaleX: false,
                animate: true,
                complete: false
            });
        }
    }

    render() {
        const { className } = this.props;
        const { scaleX, animate, complete } = this.state;
        return (
            <div className={classNames(styles.root, {
                [styles.animate]: animate,
                [styles.complete]: complete
            }, className)}>
                <span ref="fill" className={styles.fill} style={{
                    transform: scaleX ? `scale3d(${scaleX}, 1, 1)` : ''
                }} />
            </div>
        );
    }

}

ProgressBar.propTypes = {
    active: PropTypes.number.isRequired,
    className: PropTypes.string
};

ProgressBar.defaultProps = {
    active: false
};

export default ProgressBar;
