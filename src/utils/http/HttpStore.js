/**
 * Created by epotignano on 12/4/16.
 */

function Http (state = {
  isFetching : false
}, action) {
  switch(action.type) {
    case('FETCHING'):
      return Object.assign({}, state, {
        isFetching: true
      });
    case('RESPONSE') :
      return Object.assign({
        isFetching: false,
        response : {
          url : action.response.url,
          status: action.response.status
        }
      });
    default: return state;
  }
}

export default Http;
