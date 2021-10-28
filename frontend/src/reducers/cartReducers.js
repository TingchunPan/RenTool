import {
  ADD_ITEM, REMOVE_ITEM, RESET_ITEM
} from '../constants/cartConstants';
/**
 * @author Ting-chun Pan
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/reducers/cartReducers.js
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case RESET_ITEM:
      return {
        cartItems: []
      }
    default:
      return state;
  }
};
