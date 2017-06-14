import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Signout = ({ isSignedOut, onRequestSignout }) => {
    if( !isSignedOut ) {
        setTimeout(onRequestSignout, 1000);
    }

    return (
        <div>
            <h1>Stiry Sign-out</h1>
            {
                isSignedOut 
                ?
                <p>
                    You are now signed out of the private portions of this site.  You may still use public portions of this site.
                    If you want to sign in again, <Link to="/signin">click here</Link> or use the "Sign In" located in the top menu.
                </p>
                :
                <p>
                    Your request to sign out is in progress....
                </p>
            }
        </div>
    )
};

const mapStateToProps = ({authentication}) => {
    return {
        isSignedOut: !authentication.isAuthorizedUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSignout: () => dispatch(signout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout); 


