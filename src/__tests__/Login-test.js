/**
 * Created by epotignano on 9/4/16.
 */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Login from '../containers/Login';
import expect from 'expect';

describe('Login screen functionality', function(){
  var _loginContainer;

  it('Should render without problems', function(){
    _loginContainer = TestUtils.renderIntoDocument(<Login/>);
    expect(_loginContainer).toExist();
  });

  it('Should render three fields, Username, Password and Domain', function(){

  });
});
