/**
 * Created by epotignano on 9/4/16.
 */
import { ApiRef } from '../constants/Commons'
const OAuthEndpoint = ApiRef + '/oauth';
let tokenTimeOut = 10000;

function startCount(time) {
  //TODO refresh token call
  setTimeout(() =>{
    fecth(OAuthEndpoint + '/token', {
      body : {
        'grant_type': 'refesh_token',
        'refresh_token': 'token'
      }
    })
      .then((data) => {
        //Deal with it
      })
  }, time)
}


export function InitCount() {
  startCount(tokenTimeOut)
}

export function refreshCount() {

}

export function refreshToken() {

}
