import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetRedirect } from './../../actions/actionCreators.js';

// HACK: This component renders a <Redirect /> based on a dispatched REQUEST_REDIRECT action.
// TODO: Revisit once react-router-redux version 5 is out of beta.

class Redirector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.redirectUrl == this.props.redirectUrl) {
            return;
        }

        if(nextProps.redirectUrl) {
            // Ensure redirect only happens once.     
            this.props.resetRedirect();     
        }
    } 
 
    render() {
        if(this.props.redirectUrl) {
            console.log('Redirecting to ' + this.props.redirectUrl);
        }
        return this.props.redirectUrl && <Redirect to={{ pathname: this.props.redirectUrl}}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        redirectUrl: state.redirectUrl
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetRedirect: () => dispatch(resetRedirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Redirector);
