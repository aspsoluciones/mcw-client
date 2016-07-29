import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, hashHistory, History } from 'react-router'

import App from './containers/App';
import Public from './containers/Public';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Forbidden from './containers/Forbidden';
import Appointment from './containers/Appointment';
import Confirmation from './containers/Confirmation';
import Checkout from './containers/Checkout';
import Auth from './containers/Auth';
import AppointmentSuccessContainer from './containers/AppointmentSuccess';
import Register from './containers/Register';
import configureStore from './store/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
// import '../node_modules/jquery/dist/jquery';
import 'file?name=libphonenumber.js!../node_modules/react-intl-tel-input/dist/libphonenumber.js';

// require('../semantic/dist/semantic.min.js');
// require('../semantic/dist/semantic.min.css');
require('eventsource-polyfill');
require('leaflet');
require('./configs/axios.config');
const store = configureStore();
injectTapEventPlugin();

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

render(

  <Provider store={store}>
    <Router  onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
      <Route name="forbidden" component={Forbidden}/>
      <Route name="doctor" path="/doctor" component={Public}>
        <Route name="confirmation" path="/doctor/confirmation/:confirmationId" component={Confirmation}/>
        <Route name="appointments" path="/doctor/:doctorUsername" component={Appointment}/>
        <Route name="appointmentsWidget" path="/doctor/:doctorUsername?widget=:widget" component={Appointment}/>
        <Route name="checkout" path="/doctor/:doctorUsername/appointment/checkout" component={Checkout}/>
        <Route name="checkout" path="/appointment/success" component={AppointmentSuccessContainer}/>

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