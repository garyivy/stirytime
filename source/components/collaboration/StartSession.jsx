import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { startCollaboration } from './../../actions/actionCreators.js';
import { Link } from 'react-router-dom';

export const StartSessionPresentation = ({ sessionName, onChange, onSubmit, error }) => (
    <div>
        <h1>Start a Stiry Collaboration</h1>
        <p>
            A collaboration name is needed to group participants together.
            One person starts a collaboration here.  The remaining partipants will need this name to join the collaboration by
            &nbsp;<Link to="/joinsession">clicking here</Link> or choosing "Join Collaboration" from the site menu.
        </p>
        <div className="field">
            <label>Session Name</label>
            <input type="text" name="sessionName" value={sessionName} onChange={onChange} />
            {error && <label className="error">{error}</label>}
        </div>
        <div className="button-container">
            <button className="primary" onClick={onSubmit}>Submit</button>
        </div>
    </div>
);

export class StartSessionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionName: '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ sessionName: event.target.value, error: null });
    }

    onSubmit() {
        if(isNullOrWhitespace(this.state.sessionName)) {
            this.setState({ error: 'Session name is required.' });
        } else {
            this.setState({ error: null });
            this.props.startCollaboration(this.state.sessionName);
        }
    }
    render() {
        return (
            <StartSessionPresentation 
                sessionName={this.state.sessionName} 
                onChange={this.onChange} 
                onSubmit={this.onSubmit}
                error={this.state.error} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.collaboration.error 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startCollaboration:  (collaborationName) => 
            dispatch(startCollaboration(collaborationName))
    }
}

const StartSession = connect(mapStateToProps, mapDispatchToProps)(StartSessionContainer); 

export default StartSession;
