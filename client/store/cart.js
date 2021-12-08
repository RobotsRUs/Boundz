import axios from 'axios';

// helpers:
const setLocalStorageCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const getLocalStorageCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

const addItemOrUpdateQty = (cart, product, quantity) => {
  let alreadyInCart = false;
  const updatedCart = cart.map((cartItem) => {
    if (cartItem.product.id === product.id) {
      alreadyInCart = true;
      return { ...cartItem, quantity: cartItem.quantity + quantity };
    } else {
      return cartItem;
    }
  });
  if (!alreadyInCart) {
    updatedCart.push({ product, quantity });
  }
  return updatedCart;
};

// action types:
const ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'ADD_TO_CART',
  UPDATE_ITEM_QTY = 'UPDATE_ITEM_QTY',
  SET_CART = 'SET_CART',
  CLEAR_CART = 'CLEAR_CART';

// action creators:
const _addToCart = (product, quantity) => ({
  type: ADD_TO_CART,
  product,
  quantity,
});
const _removeFromCart = (product) => ({ type: REMOVE_FROM_CART, product });
const _updateItemQty = (product, quantity) => ({
  type: UPDATE_ITEM_QTY,
  product,
  quantity,
});
const _setCart = (cart) => ({ type: SET_CART, cart });
export const clearCart = () => ({ type: CLEAR_CART });

// thunk creators:
export const fetchCart = (userId) => async (dispatch) => {
  try {
    if (userId) {
      const { data: cart } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(_setCart(cart));
    } else {
      dispatch(_setCart(getLocalStorageCart()));
    }
  } catch (err) {
    console.log(err);
  }
};

export const addToCart =
  (userId, product, quantity = 1) =>
  async (dispatch) => {
    try {
      if (userId) {
        const { data: cartItem } = await axios.post(
          `/api/users/${userId}/cart`,
          {
            productId: product.id,
            quantity,
          }
        );
        dispatch(_addToCart(cartItem));
      } else {
        const currentCart = getLocalStorageCart();
        setLocalStorageCart(addItemOrUpdateQty(currentCart, product, quantity));
        dispatch(_addToCart(product, quantity));
      }
    } catch (err) {
      console.log(err);
    }
  };

export const removeFromCart = (userId, product) => async (dispatch) => {
  try {
    if (userId) {
      await axios.delete(`/api/users/${userId}/cart/${product.id}`);
      dispatch(_removeFromCart(product));
    } else {
      const currentCart = getLocalStorageCart();
      setLocalStorageCart(
        currentCart.filter((cartItem) => cartItem.product.id !== product.id)
      );
      dispatch(_removeFromCart(product));
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateItemQty =
  (userId, product, quantity) => async (dispatch) => {
    try {
      if (userId) {
        await axios.put(`/api/users/${userId}/cart/${product.id}`, {
          quantity,
        });
      } else {
        const currentCart = getLocalStorageCart();
        setLocalStorageCart(
          currentCart.map((cartItem) =>
            cartItem.product.id === product.id
              ? { ...cartItem, quantity }
              : cartItem
          )
        );
        dispatch(_updateItemQty(product, quantity));
      }
    } catch (err) {
      console.log(err);
    }
  };

export const emptyCart = (userId) => async (dispatch) => {
  try {
    if (userId) {
      await axios.delete(`/api/users/${userId}/cart`);
      dispatch(clearCart());
    } else {
      localStorage.removeItem('cart');
      dispatch(clearCart());
    }
  } catch (err) {
    console.log(err);
  }
};

// reducer:
const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case ADD_TO_CART:
      return addItemOrUpdateQty(cart, action.product, action.quantity);
    case REMOVE_FROM_CART:
      return cart.filter(
        (cartItem) => cartItem.product.id !== action.product.id
      );
    case UPDATE_ITEM_QTY:
      return cart.map((cartItem) =>
        cartItem.product.id === action.product.id
          ? { ...cartItem, quantity: action.quantity }
          : cartItem
      );
    case CLEAR_CART:
      return [];
    default:
      return cart;
  }
};

export default cartReducer;
