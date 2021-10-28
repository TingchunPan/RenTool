import {
  FAIL_SIGNIN,
  REQ_SIGNIN,
  SUCCESS_SIGNIN,
  SUCCESS_SIGNOUT,
  FAIL_REGISTER,
  REQ_REGISTER,
  SUCCESS_REGISTER,
} from '../constants/userConstants';
/**
 * @author Ting-chun Pan
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/reducers/userReducers.js
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */


export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case REQ_SIGNIN:
      return { loading: true };
    case SUCCESS_SIGNIN:
      return { loading: false, userInfo: action.payload };
    case FAIL_SIGNIN:
      return { loading: false, error: action.payload };
    case SUCCESS_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REQ_REGISTER:
      return { loading: true };
    case SUCCESS_REGISTER:
      return { loading: false, userInfo: action.payload };
    case FAIL_REGISTER:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


