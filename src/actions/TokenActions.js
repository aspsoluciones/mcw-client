/**
 * Created by epotignano on 9/4/16.
 */
import { ApiRef, TokenRef, RefreshTokenRef } from '../constants/Commons'
const OAuthEndpoint = ApiRef + '/oauth';
let tokenTimeOut = 3000;
import {  } from 'react-router';

function startCount(time) {
  //TODO refresh token call
  setTimeout(() =>{
    $.ajax({
      type: "POST",
      url: "http://desa-prog03.miclinicaweb.com/WebApi/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: $.param({
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem(RefreshTokenRef)
      })
    }).success((data) => {
        console.log(data);
        // restart count
        startCount(tokenTimeOut);
      }).error((xhr, status, text) => {
        if(xhr.status == 400) {
          //Deal with it
          // When the token is not valid, kick the user to the login or render a login modal
        }
    })
  }, time);

  return {
    'status': 'TokenRefreshStarted'
  }
}


export function TokenRefreshCount() {
  return dispatch => {
    dispatch(startCount(tokenTimeOut))
  }
}
