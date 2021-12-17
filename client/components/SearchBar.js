import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import {
  AppBar,
  Box,
  Toolbar,
  Grid,
  Typography,
  InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import CartIcon from './CartIcon';
import UserDashboard from './UserDashboard';

import AdminDashboard from './AdminDashboard';
import history from '../history';

import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export class SearchBar extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" style={{ background: '#000000' }}>
          <Toolbar>
            <Grid item container xs={6} sm={12}>
              {<AdminDashboard />}
              <Link to="/products">Browse</Link>
            </Grid>
            <Grid justifyContent={'flex-start'} item container xs={6} sm={12}>
              <div>Boundz Bookz</div>
            </Grid>

            {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search by category"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search> */}
            <Grid>
              <Link to="/cart">
                <CartIcon />
              </Link>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState)(SearchBar);
