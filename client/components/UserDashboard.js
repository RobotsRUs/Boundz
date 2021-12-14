import * as React from 'react';
import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuBookIcon from '@mui/icons-material';

export default class UserDashboard extends React.Component {
  render() {
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
              ☰ Boundz Menu
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>
                Genres
                <img src={MenuBookIcon} />
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                My Account&nbsp;&nbsp;&nbsp;
                <Avatar src="/broken-image.jpg" />
              </MenuItem>
              <MenuItem onClick={popupState.close}>Past Orders</MenuItem>
              <MenuItem onClick={popupState.close}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }
}
