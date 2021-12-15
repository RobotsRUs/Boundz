import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import './style.css';
import App from './App';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  request.headers['authorization'] = window.localStorage.getItem('token');
  return request;
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
