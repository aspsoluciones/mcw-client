/**
 * Created by epotignano on 9/4/16.
 */
import { ApiRef, TokenRef, RefreshTokenRef } from '../constants/Commons'
const OAuthEndpoint = ApiRef + '/oauth';
let tokenTimeOut = 3000;
import {  } from 'react-router';

function startCount(time) {
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
    }).success((response) => {
        localStorage.setItem(TokenRef, response.access_token);
        localStorage.setItem(RefreshTokenRef, response.refresh_token);
        startCount(response['expires_in'] * 1000 * .75);
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

