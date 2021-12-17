import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { logout } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AdminDashboard extends React.Component {
  render() {
    return (
      <PopupState
        container
        justifyContent="flex-end"
        variant="popover"
        popupId="adminDashboard"
      >
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              📚 Boundz Menu 📚
            </Button>
            <Menu {...bindMenu(popupState)}>
              <Link to="/home">
                <MenuItem>🏠&nbsp;&nbsp;&nbsp;Boundz Home</MenuItem>
              </Link>

              <Link to="/products">
                <MenuItem onClick={popupState.close}>
                  📖&nbsp;&nbsp;&nbsp;Boundz Collection
                </MenuItem>
              </Link>

              <Link to="/products/add">
                <MenuItem onClick={popupState.close}>
                  ➕&nbsp;&nbsp;&nbsp;Add Product
                </MenuItem>
              </Link>

              <Link to="/users/">
                <MenuItem onClick={popupState.close}>
                  👥&nbsp;&nbsp;&nbsp;Customer Accounts
                </MenuItem>
              </Link>

              <Link to="/cart">
                <MenuItem onClick={popupState.close}>
                  🛒&nbsp;&nbsp;&nbsp;Shopping Cart
                </MenuItem>
              </Link>

              {/* <Link to="/users/:userId">
                <MenuItem onClick={popupState.close}>
                  👤&nbsp;&nbsp;&nbsp;My Personal Account
                </MenuItem>
              </Link>

              <MenuItem onClick={popupState.close}>
                🧾&nbsp;&nbsp;&nbsp;My Personal Orders
              </MenuItem> */}

              <Link to="#" onClick={this.props.handleClick}>
                <MenuItem onClick={popupState.close}>
                  🔚&nbsp;&nbsp;&nbsp;Logout
                </MenuItem>
              </Link>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(getUser());
    },
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(AdminDashboard);
