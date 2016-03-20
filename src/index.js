import React from 'react';

import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'

import App from './containers/App';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import ProfileFlowContainer from './containers/profileFlow/Container';
import Forbidden from './containers/Forbidden';
import Auth from './containers/Auth';
import Register from './containers/Register';
import configureStore from './store/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import '../node_modules/jquery/dist/jquery';

require('../semantic/dist/semantic');
require('../semantic/dist/semantic.min.css');

const store = configureStore();
injectTapEventPlugin();

render(

  <Provider store={store}>
    <Router history={hashHistory}>
      <Route name="forbidden" component={Forbidden}/>
       <Route name="app" path="/app" component={App}>
         <IndexRoute component={Dashboard} name="dashboard"/>
         <Route name="userFlow" path="/app/profile" component={ProfileFlowContainer}>
         </Route>
      </Route>
      <Route name="access" path="/access" component={Auth}>
        <Route name="login" path="/access/login" component={Login}/>
        <Route name="register" path="/access/register" component={Register}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);
