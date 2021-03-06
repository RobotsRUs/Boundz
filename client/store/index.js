import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import singleProduct from './singleProduct';
import auth from './auth';
import products from './products';
import cart from './cart';

const reducer = combineReducers({
  auth,
  singleProduct,
  products,
  cart,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './singleProduct';
export * from './cart';
