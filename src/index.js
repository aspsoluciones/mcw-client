import React from 'react';

import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router'

import App from './containers/App';
import Public from './containers/Public';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Forbidden from './containers/Forbidden';
import Appointment from './containers/Appointment';
import Checkout from './containers/Checkout';
import Auth from './containers/Auth';
import Register from './containers/Register';
import configureStore from './store/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import '../node_modules/jquery/dist/jquery';

require('../semantic/dist/semantic');
require('../semantic/dist/semantic.min.css');
require('leaflet');

const store = configureStore();
injectTapEventPlugin();

render(

  <Provider store={store}>
    <Router history={hashHistory}>
      <Route name="forbidden" component={Forbidden}/>
      <Route name="doctor" path="/doctor" component={Public}>
        <Route name="appointments" path="/doctor/:doctorUsername" components={Appointment}/>
        <Route name="checkout" path="/doctor/:doctorUsername/appointment/checkout" components={Checkout}/>
      </Route>
      <Route name="app" path="/app" component={App}>
        <Route name="dashboard" path="/app/dashboard" component={Dashboard}/>
      </Route>
      <Route name="access" path="/access" component={Auth}>
        <Route name="login" path="/access/login" component={Login}/>
        <Route name="register" path="/access/register" component={Register}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);
