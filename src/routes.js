import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory, History, IndexRoute } from 'react-router'

//ROUTES


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

export default (
  <Route path="/" component={App}>
    <Route name="forbidden" component={Forbidden}/>
      <Route name="doctor" path="/doctor" component={Public}>
        <Route name="confirmation" path="/doctor/confirmation/:confirmationId" component={Confirmation}/>
        <Route name="appointments" path="/doctor/:doctorUsername"  component={Appointment}/>
        <Route name="appointmentsWidget"  path="/doctor/:doctorUsername?widget=:widget" component={Appointment}/>
        <Route name="checkout"  path="/doctor/:doctorUsername/appointment/checkout" component={Checkout}/>
        <Route name="checkout"  path="/appointment/success" component={AppointmentSuccessContainer}/>

      </Route>
      <Route name="app" path="/app" component={App}>
        <Route name="dashboard" path="/app/dashboard" component={Dashboard}/>
      </Route>
      <Route name="access" path="/access" component={Auth}>
        <Route name="login" path="/access/login" component={Login}/>
        <Route name="register" path="/access/register" component={Register}/>
      </Route>
  </Route>
);
