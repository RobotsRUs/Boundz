import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { fetchCart } from '../store';

class CartIcon extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.auth.id !== this.props.auth.id) {
      this.props.fetchCart(this.props.auth.id);
    }
  }
  render() {
    return (
      <Badge
        badgeContent={
          this.props.cart &&
          this.props.cart.reduce((sum, item) => sum + item.quantity, 0)
        }
      >
        <ShoppingCartIcon />
      </Badge>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (userId) => dispatch(fetchCart(userId)),
});

export default connect(mapState, mapDispatch)(CartIcon);
