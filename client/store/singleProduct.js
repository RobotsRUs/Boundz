import axios from 'axios';

// action types:
const SET_PRODUCT = 'SET_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

// action creators:
const _setProduct = (product) => ({ type: SET_PRODUCT, product });
export const clearProduct = () => ({ type: CLEAR_PRODUCT });

// thunk creators:
export const fetchProduct = (productName) => async (dispatch) => {
  try {
    const { data: product } = await axios.get(`/api/products/${productName}`);
    dispatch(_setProduct(product));
  } catch (err) {
    console.log(err);
  }
};

// reducer:
const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case CLEAR_PRODUCT:
      return {};
    default:
      return state;
  }
};

export default singleProductReducer;
