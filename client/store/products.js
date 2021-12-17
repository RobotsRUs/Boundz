import axios from 'axios';

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

const fetchAllProducts = (productList) => ({
  type: GET_ALL_PRODUCTS,
  productList,
});

export const fetchAllProductsThunk =
  (query = '') =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products?${query}`);
      dispatch(fetchAllProducts(data));
    } catch (error) {
      console.error('There was an error retrieving all products: ', error);
    }
  };

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.productList;
    default:
      return state;
  }
}
