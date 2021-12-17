import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { SearchBar } from './SearchBar';
import CartIcon from './CartIcon';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/menu" component={SearchBar} />
          <Link to="/cart"></Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Link to="/menu" component={SearchBar} />
          <Link to="/cart"></Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
