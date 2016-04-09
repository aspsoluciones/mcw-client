/**
 * Created by epotignano on 9/4/16.
 */
import { ApiRef, TokenRef} from '../constants/Commons'
const OAuthEndpoint = ApiRef + '/oauth';
let tokenTimeOut = 3000;

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
        refresh_token: localStorage.getItem(TokenRef)
      })
    }).success((data) => {
        console.log(data);
        // restart count
        startCount(tokenTimeOut);
      }).error((data) => {
      //Deal with it
      // When the token is not valid, kick the user to the login or render a login modal
      console.log(data);
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
