import Axios from 'axios';
import {
  FAIL_PROD_DETAL,
  REQ_PROD_DETAL,
  SUCCESS_PROD_DETAL,
  FAIL_PROD_LIST,
  REQ_PROD_LIST,
  SUCCESS_PROD_LIST,
  REQ_PROD_DELE,
  FAIL_PROD_DELE,
  SUCCESS_PROD_DELE,

} from '../constants/productConstants';
/**
 * @author Ting-chun Pan
 * @reference 
https://github.com/basir/amazona/blob/master/frontend/src/actions/productActions.js
 * @param {*} param0 
 * @returns 
 */
export const listProducts = ({ pageNumber = '', name = '' }) => async (
  dispatch
) => {
  dispatch({
    type: REQ_PROD_LIST,
  });
  try {

    const { data } = await Axios.get(
      `/api/products?pageNumber=${pageNumber}&name=${name}`
    );
    dispatch({ type: SUCCESS_PROD_LIST, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_PROD_LIST, payload: error.message });
  }
};



export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: REQ_PROD_DETAL, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: SUCCESS_PROD_DETAL, payload: data });
  } catch (error) {
    dispatch({
      type: FAIL_PROD_DETAL,
      payload: error.message,
    });
  }
};



export const productDeleted = (productId) => async (dispatch) => {
  dispatch({ type: REQ_PROD_DELE, payload: productId });
  try {
    const { data } = Axios.delete(`/api/products/${productId}`
    );
    dispatch({ type: SUCCESS_PROD_DELE });

  } catch (error) {
    const message = error.message

    dispatch({ type: FAIL_PROD_DELE, payload: message });
  }
};
