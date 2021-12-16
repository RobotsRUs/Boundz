import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { SearchBar } from './SearchBar';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {/* <h1>📖&nbsp;&nbsp;&nbsp;Boundz Bookz&nbsp;&nbsp;&nbsp;📖</h1> */}
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/menu" component={SearchBar} />
          {/* <Link to="/menu" component={AdminDashboard}></Link> */}
          {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Link to="/menu" component={SearchBar} />
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
