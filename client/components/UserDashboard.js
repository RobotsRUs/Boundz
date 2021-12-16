import * as React from 'react';
import { Button, Menu, MenuItem, Avatar, SvgIcon } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class UserDashboard extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <PopupState
        container
        justifyContent="flex-end"
        variant="popover"
        popupId="userDashboard"
      >
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              📚 Boundz Menu 📚
            </Button>
            <Menu {...bindMenu(popupState)}>
              <Link to="/home">
                <MenuItem onClick={popupState.close}>
                  🏠&nbsp;&nbsp;&nbsp;Boundz Home
                </MenuItem>
              </Link>

              <Link to="/products">
                <MenuItem onClick={popupState.close}>
                  📖&nbsp;&nbsp;&nbsp;Boundz Collection
                </MenuItem>
              </Link>

              <Link to="/cart">
                <MenuItem onClick={popupState.close}>
                  🛒&nbsp;&nbsp;&nbsp;Shopping Cart
                </MenuItem>
              </Link>

              {isLoggedIn ? (
                <>
                  <Link to="/users/:userId">
                    <MenuItem onClick={popupState.close}>
                      👤&nbsp;&nbsp;&nbsp;My Account
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={popupState.close}>
                    🧾&nbsp;&nbsp;&nbsp;Past Orders
                  </MenuItem>
                  <Link to="#" onClick={this.handleClick}>
                    <MenuItem onClick={popupState.close}>
                      🔚&nbsp;&nbsp;&nbsp;Logout
                    </MenuItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <MenuItem onClick={popupState.close}>
                      📜&nbsp;&nbsp;&nbsp;Register Here
                    </MenuItem>
                  </Link>

                  <Link to="/login">
                    <MenuItem onClick={popupState.close}>
                      🔛&nbsp;&nbsp;&nbsp;Login
                    </MenuItem>
                  </Link>
                </>
              )}
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
  };
};

export default connect(mapState, mapDispatch)(UserDashboard);
