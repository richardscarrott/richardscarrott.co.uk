import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchActivityIfNeeded } from '../../actions/code/code';
import {
    getIsFetching,
    getError,
    getEvents,
    getHasData
} from '../../selectors/code/code';
import Loader from '../lib/loader/Loader';
import styles from './Code.css'

class Code extends Component {

    constructor(props) {
        super(props);
        this.handleRetry = this.handleRetry.bind(this);
    }

    componentDidMount() {
        Code.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    handleRetry() {
        Code.fetchData({
            store: this.context.store,
            params: this.props.params
        });
    }

    render() {
        const { isFetching, error, events, hasData } = this.props;
        return (
            <div className={styles.root}>
                <Helmet title="Code" />
                {isFetching ? (
                    <Loader />
                ) : null}
                {error ? (
                    <div onClick={this.handleRetry}>Error... {this.props.error}</div>
                ) : null}
                {!hasData && !isFetching ? (
                    <div>No data.</div>
                ) : null}
                {events.map(event => (
                    <div key={event.id}>
                        <div dangerouslySetInnerHTML={{
                            __html: event.html
                        }} />
                    </div>
                ))}
            </div>
        );
    }
}

Code.contextTypes = {
    store: PropTypes.object.isRequired
};

Code.fetchData = function({ store }) {
    return store.dispatch(fetchActivityIfNeeded());
};

// Avoid creating a new instance everytime mapStateToProps is called to ensure
// shouldComponentUpdate isn't invalidated.
const EMPTY_EVENTS = [];

function mapStateToProps(state) {
    return {
        isFetching: getIsFetching(state).getOrElse(false),
        error: getError(state).getOrElse(null),
        events: getEvents(state).getOrElse(EMPTY_EVENTS),
        hasData: getHasData(state).getOrElse(false)
    };
}

export default connect(mapStateToProps)(Code);
