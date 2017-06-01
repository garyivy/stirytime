import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteUnconnected = ({ component: Component, ...rest }) => { 
    const isAuthorizedUser = () => rest.isAuthorizedUser; // TODO: Could I simply check props.isAuthorizedUser in the Route render?
    return (
      <Route {...rest} render={ props => (
        isAuthorizedUser() 
          ? (<Component {...props}/>) 
          : (<Redirect to={{ pathname: '/login', state: { from: props.location }}}/>)
      )}/>
    );
}

const mapStateToProps = (state) => {
    return { isAuthorizedUser: state.isAuthorizedUser }
}

const PrivateRoute = connect(mapStateToProps, undefined)(PrivateRouteUnconnected);

export default PrivateRoute;