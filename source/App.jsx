import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter  
} from 'react-router-dom';
import history from './shared/history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from './reducers/combinedReducer.js';

import './style/app.scss';

import PrivateRoute from './private/PrivateRoute.jsx';
import Header from './layout/Header.jsx';
import Menu from './layout/Menu.jsx';
import Home from './public/Home.jsx';
import Signin from './public/Signin.jsx';
import Signout from './private/Signout.jsx';
import StartSession from './session/StartSession.jsx';
import JoinSession from './session/JoinSession.jsx';
import Questionnaire from './session/Questionnaire.jsx';
import Wait from './session/Wait.jsx';
import Scrambled from './session/Scrambled.jsx';
import About from './public/About.jsx';
import NewUser from './public/NewUser.jsx';
import ForgotPassword from './public/ForgotPassword.jsx';
import ResetPassword from './public/ResetPassword.jsx';
import Redirector from './public/Redirector.jsx';
//import { thunk } from './../thunk.js'

let store = createStore(combinedReducer, {}, applyMiddleware(thunk) );

// TODO: /questionnaire should redirect to /start if no collaborationToken
const layout = (
  <div>
    <Redirector/>
    <Header/>
    <Menu/>
    <article className="centered-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/register" component={NewUser} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset" component={ResetPassword} />
        <PrivateRoute path="/start" component={StartSession} />
        <PrivateRoute path="/join" component={JoinSession} />
        <PrivateRoute path="/questionnaire" component={Questionnaire} />
        <PrivateRoute path="/wait" component={Wait} />
        <Route path="/scrambled" component={Scrambled} />
        <Route path="/about" component={About} />
      </Switch>
    </article>
  </div>
);

render(
  <Provider store={store}><Router history={history}>{layout}</Router></Provider>,
    document.getElementById('app'));