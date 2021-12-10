import axios from 'axios';

import { clearLocalStorageCart, getLocalStorageCart } from '.';
import history from '../history';

const TOKEN = 'token';

// action types:

const SET_AUTH = 'SET_AUTH';
const CREATE_NEW_USER = 'CREATE_NEW_USER';
const UPDATE_USER = 'UPDATE_USER';

// action creators:

const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _createUser = (newUser) => ({
  type: CREATE_NEW_USER,
  newUser,
});

const _updateUser = (userBeingUpdated) => ({
  type: UPDATE_USER,
  userBeingUpdated,
});

// thunk creators:
export const createUser = (newUser) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', newUser);
    console.log('This is the thunk data: ', data);
    dispatch(_createUser(data));
  } catch (error) {
    console.error('There was an error creating new user: ', error);
  }
};

export const getUser = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data: user } = await axios.get('/auth/user', {
      headers: { authorization: token },
    });
    // merge guest cart (if there is one) into users cart
    const guestCart = getLocalStorageCart();
    if (guestCart.length) {
      clearLocalStorageCart();
      await Promise.all(
        guestCart.map((cartItem) =>
          axios.post(`/api/users/${user.id}/cart`, {
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
          })
        )
      );
    }
    return dispatch(setAuth(user));
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/users/${user.userId}`, user);
    dispatch(_updateUser(user));
  } catch (error) {
    console.error('Error updating current user', error);
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        firstName: '',
        lastName: '',
        email: `${username}@gmail.com`,
        userType: 'Customer',
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(getUser());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

// reducer:

export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case CREATE_NEW_USER:
      return action.newUser;
    case UPDATE_USER:
      return action.userBeingUpdated;
    default:
      return state;
  }
};
