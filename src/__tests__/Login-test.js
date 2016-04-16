/**
 * Created by epotignano on 9/4/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import Login from '../containers/Login';
import configStore from '../store/configureStore';
import expect from 'expect';
let store = configStore();
describe('Login screen functionality', function(){
  var _loginContainer;

  it('Should render without problems', function(){
    _loginContainer = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Login/>
      </Provider>
    );
    expect(_loginContainer).toExist();
  });

  it('Should render three fields, Username, Password and Domain', () => {
    var Fields = TestUtils.scryRenderedDOMComponentsWithTag(
      _loginContainer,
      'input'
    );
    expect(Fields[0].name).toBe('username');
    expect(Fields[1].name).toBe('password');
    expect(Fields[2].name).toBe('domain');
  });

  it('should fail login with wrong permissions', () => {
    var Button = TestUtils.findRenderedDOMComponentWithTag(_loginContainer, 'button');
    var Fields = TestUtils.scryRenderedDOMComponentsWithTag(
      _loginContainer,
      'input'
    );

    Fields.map((field) => {
      field.value = 'Something wrong';
    });

    var Form = TestUtils.scryRenderedDOMComponentsWithTag(_loginContainer, 'form')[0];
    console.log(Form);
    TestUtils.Simulate.submit(Form);


  })
});
