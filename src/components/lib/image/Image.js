import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react/lib/ReactCssTransitionGroup';
// import Spinner from '../spinner/Spinner';
import styles from './Image.css';

export const status = {
    PENDING: 'PENDING',
    ERROR: 'ERROR',
    COMPLETE: 'COMPLETE'
};

const imageTransitionGroupName = {
    appear: styles.imageAppear,
    appearActive: styles.imageAppearActive
};

function aspectRatioToClassName(aspectRatio) {
    return `ratio-${aspectRatio.replace(':', '-')}`;
}

// TODO: Support SSR, i.e. at the momment a spinner is rendered serverside.
// TODO: Handle responsive images (including retina)
//  - Could either try out the html <picture /> element or use window.matchMedia.
//    The former might be a better solution as it would work without js
// NOTE: To remain compatable with markdown rendering <Image /> must not use any
// block elements as it's rendered inside <p> tags.
class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: status.PENDING,
            fromCache: false
        };
    }

    componentDidMount() {
        this.loadImage();
    }

    componentWillUnmount() {
        this.clean();
    }

    loadImage() {
        this.clean();
        const img = this.img = document.createElement('img');
        img.onload = () => {
            this.setState({
                status: status.COMPLETE
            });
        };
        img.onerror = () => {
            this.setState({
                status: status.ERROR
            });
        };
        img.src = this.props.src;
        if (img.complete) {
            this.clean();
            this.setState({
                status: status.COMPLETE,
                fromCache: true
            });
        }
    }

    clean() {
        if (this.img) {
            this.img.onload = this.img.onerror = null;
        }
    }

    render() {
        const { src, title, alt, aspectRatio, className } = this.props;
        let content;

        switch (this.state.status) {
            case status.PENDING:
                // TODO: maybe show an image placeholder here instead?
                content = <span className={styles.spinner}>LOADING</span>;
                break;
            case status.ERROR:
                // TODO: maybe show a placeholder image here instread?
                content = <span className={styles.error}>ERROR</span>;
                break;
            default:
                content = (
                    <ReactCSSTransitionGroup
                        transitionName={imageTransitionGroupName}
                        transitionAppear={!this.state.fromCache}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <span key="1" className={styles.image} style={{
                            backgroundImage: 'url(' + src + ')'
                        }}></span>
                    </ReactCSSTransitionGroup>
                );
                break;
        }

        return (
            <span className={classNames(styles[aspectRatioToClassName(aspectRatio)] , className)}>
                <span className={styles.inner}>
                    {content}
                </span>
            </span>
        );
    }

}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    aspectRatio: PropTypes.oneOf([
        '4:3',
        '16:9'
    ]).isRequired,
    className: PropTypes.string
};

Image.defaultProps = {
    aspectRatio: '16:9'
};

export default Image;
