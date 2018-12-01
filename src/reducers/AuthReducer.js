const INITIAL_STATE =  { email: '', pass: '', user: '', error: '', loading: ''}
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_SPIN } from '../actions/types';

export default (state = INITIAL_STATE, action)  => {
  //  console.log(action);
    switch (action.type) {
      case EMAIL_CHANGED:
        // console.log(action.payload);
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        // console.log(action.payload);
        return { ...state, pass: action.payload };
      case LOGIN_USER_SUCCESS:
        return { ...state, user: action.payload, error: '', loading: false, email: '', pass:''};
      case LOGIN_USER_FAILED:
            return { ...state, error: 'Authentication Failed', pass: '', loading: false};
      case LOGIN_USER_SPIN:
            return { ...state, error: '', loading: true } 
      default:
        return state;
    }
}