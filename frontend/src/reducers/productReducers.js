/**
 * @author Ting-chun Pan
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/reducers/productReducers.js
 */
const {
  REQ_PROD_LIST,
  SUCCESS_PROD_LIST,
  FAIL_PROD_LIST,
  REQ_PROD_DETAL,
  SUCCESS_PROD_DETAL,
  FAIL_PROD_DETAL,
  SUCCESS_PROD_UPLOAD,
  FAIL_PROD_UPLOAD,
  REQ_PROD_UPLOAD,
  REQ_PROD_DELE,
  SUCCESS_PROD_DELE,
  FAIL_PROD_DELE,
  RESET_PROD_DELE,


} = require('../constants/productConstants');

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case REQ_PROD_LIST:
      return { loading: true };
    case SUCCESS_PROD_LIST:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case FAIL_PROD_LIST:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case REQ_PROD_DETAL:
      return { loading: true };
    case SUCCESS_PROD_DETAL:
      return { loading: false, product: action.payload };
    case FAIL_PROD_DETAL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const userUploadReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case REQ_PROD_UPLOAD:
      return { loading: true };
    case SUCCESS_PROD_UPLOAD:
      return { loading: false, product: action.payload };
    case FAIL_PROD_UPLOAD:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REQ_PROD_DELE:
      return { loading: true };
    case SUCCESS_PROD_DELE:
      return { loading: false, success: true };
    case FAIL_PROD_DELE:
      return { loading: false, error: action.payload };
    case RESET_PROD_DELE:
      return {};
    default:
      return state;
  }
};

