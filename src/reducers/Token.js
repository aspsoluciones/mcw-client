/**
 * Created by epotignano on 9/4/16.
 */

import {
  TOKEN_API_CALL,
  TOKEN_REFRESH
} from '../constants/ActionTypes'

function token(state= {}, action) {
  switch(action.type) {
    case(TOKEN_REFRESH):
      return Object.assign({}, state,{
        'validToken': true
      });
    default: return state;
  }
}

export default token;
