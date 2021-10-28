import Axios from 'axios';
import { ADD_ITEM, REMOVE_ITEM } from '../constants/cartConstants';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/axios
 * @reference 
https://github.com/basir/amazona/blob/master/frontend/src/actions/cartActions.js

 * @param {*} productId 
 * @param {*} qty 
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} rangeDate 
 * @param {*} deposit 
 * @returns 
 */


export const addCart = (productId, qty, startDate, endDate, rangeDate, deposit) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      deposit: data.deposit,
      inStock: data.inStock,
      product: data._id,
      qty,
      startDate,
      endDate,
      rangeDate,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

