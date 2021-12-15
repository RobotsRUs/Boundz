import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import { Login } from './components/AuthForm';
import Home from './components/Home';
import SingleProduct from './components/SingleProduct';
import ProductForm from './components/ProductForm';
import { getUser } from './store';
import Cart from './components/Cart';
import Checkout from './components/checkout/Checkout';
import RegistrationForm from './components/RegistrationForm';
import NewUserRegistrationForm from './components/NewUserRegistrationForm';
import UpdateUserInfo from './components/UpdateUserInfo';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId/edit" component={ProductForm} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          {isLoggedIn ? (
            <>
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
            </>
          ) : (
            <>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={NewUserRegistrationForm} />
            </>
          )}
        </Switch>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(getUser());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
