import React, { Component, PropTypes } from 'react';
import {
    startActivity,
    endActivity
} from 'actions/ui/ui';

class Loader extends Component {

    componentDidMount() {
        this.context.store.dispatch(startActivity());
    }

    componentWillUnmount() {
        this.context.store.dispatch(endActivity());
    }

    render() {
        return null;
    }

}

Loader.contextTypes = {
    store: PropTypes.object.isRequired
};

export default Loader;
