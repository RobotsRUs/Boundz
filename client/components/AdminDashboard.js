import * as React from 'react';
import { Button, Menu, MenuItem, Avatar } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuBookIcon from '@mui/icons-material';

export default class AdminDashboard extends React.Component {
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
              ☰ Boundz Menu
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Current Inventory</MenuItem>
              <MenuItem onClick={popupState.close}>Update Products</MenuItem>
              <MenuItem onClick={popupState.close}>Customer Invoices</MenuItem>
              <MenuItem onClick={popupState.close}>
                Customer Account Info
              </MenuItem>
              <MenuItem onClick={popupState.close}>
                My Personal Account&nbsp;&nbsp;&nbsp;
                <Avatar src="/broken-image.jpg" />
              </MenuItem>
              <MenuItem onClick={popupState.close}>My Personal Orders</MenuItem>
              <MenuItem onClick={popupState.close}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }
}
