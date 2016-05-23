/**
 * Created by epotignano on 12/4/16.
 */

import fetch from 'whatwg-fetch';
import { bindActionCreators } from 'redux'

console.log(fetch.request);

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

//Wrap fetch for know what is going on and publish it to a store

export function request(url, queryParams){
    if(!queryParams) {
      return fetch(url)
    } else {
      var _params = {};
      var _keys = Object.keys(queryParams);
      _keys.map(function(key){
        _params[key] = queryParams[key];
      });
      return fetch(url, _params)
    }
}
