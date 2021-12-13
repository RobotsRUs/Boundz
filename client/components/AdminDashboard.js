import * as React from 'react';

import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Stack,
} from '@mui/material';

export default function AdminDashboard() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseEvent = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack
      direction="row"
      //divider={<Divider orientation="vertical" flexItem />}
      justifyContent="flex-end"
      alignItems="center"
      spacing={3}
    >
      <Paper>
        <MenuList>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            ☰ Boundz Menu
          </Button>

          <MenuItem>Hardcovers</MenuItem>
          <MenuItem>Paperbacks</MenuItem>
          <MenuItem>eBooks</MenuItem>
          <MenuItem>Audiobooks</MenuItem>
          <MenuItem>Authors</MenuItem>
          <MenuItem>All Users</MenuItem>
          <MenuItem>My Admin Account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
      <div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseEvent}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleCloseEvent}>Hardcovers</MenuItem>
                    <MenuItem onClick={handleCloseEvent}>Paperbacks</MenuItem>
                    <MenuItem onClick={handleCloseEvent}>eBooks</MenuItem>
                    <MenuItem onClick={handleCloseEvent}>AudioBooks</MenuItem>
                    <MenuItem onClick={handleCloseEvent}>Authors</MenuItem>
                    <MenuItem onClick={handleCloseEvent}>All Users</MenuItem>
                    <MenuItem onClick={handleCloseEvent}>
                      My Admin Account
                    </MenuItem>
                    <MenuItem onClick={handleCloseEvent}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
