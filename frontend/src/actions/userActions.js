import Axios from 'axios';
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
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/actions/userActions.js
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: REQ_SIGNIN, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/signin', { email, password });
    dispatch({ type: SUCCESS_SIGNIN, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FAIL_SIGNIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,

    });
  }
};
export const register = (name, email, password, postCode) => async (dispatch) => {
  dispatch({ type: REQ_REGISTER, payload: { email, password, name, postCode } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
      postCode,
    });
    dispatch({ type: SUCCESS_REGISTER, payload: data });
    dispatch({ type: SUCCESS_SIGNIN, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FAIL_REGISTER,
      payload: error.message,
    });
  }
};
export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  dispatch({ type: SUCCESS_SIGNOUT });
};



