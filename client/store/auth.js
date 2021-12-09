import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

// action types:

const SET_AUTH = 'SET_AUTH';
const CREATE_NEW_USER = 'CREATE_NEW_USER';

// action creators:

const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _createUser = (newUser) => ({
  type: CREATE_NEW_USER,
  newUser,
});

// thunk creators:
export const createUser = (newUser) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', newUser);
    console.log('This is the thunk data: ', data);
    dispatch(_createUser(data));
    // window.location.reload();
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
    return dispatch(setAuth(user));
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
    default:
      return state;
  }
};
