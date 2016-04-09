/**
 * Created by epotignano on 9/4/16.
 */
import { ApiRef } from '../constants/Commons'
const OAuthEndpoint = ApiRef + '/oauth';
let tokenTimeOut = 10000;

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
        refresh_token: "XXXXXXXXXX"
      })
    }).success((data) => {
        console.log(data);
        //Deal with it
      }).error((data) => {
      console.log(data);
      //Deal with it
    })
  }, time);

  return {
    'status': 'TokenRefreshStarted'
  }
}


export function initTokenRefreshCount() {
  return dispatch => {
    dispatch(startCount(tokenTimeOut))
  }
}

export function refreshCount() {
  startCount(tokenTimeOut);
}

export function refreshToken() {

}
