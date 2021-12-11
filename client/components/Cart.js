import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearCart,
  emptyCart,
  fetchCart,
  removeFromCart,
  updateItemQty,
} from '../store';
import CartItem from './CartItem';
import { formatUSD, getCartTotal } from './utils';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from '@mui/material';

class Cart extends React.Component {
  calculateTotal() {}
  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id) {
      this.props.fetchCart(this.props.auth.id);
    }
  }
  componentWillUnmount() {
    this.props.clearCart();
  }
  render() {
    const { cart } = this.props;
    if (cart.length) {
      return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((cartItem) => (
                <CartItem
                  key={cartItem.product.id}
                  name={cartItem.product.title}
                  qty={cartItem.quantity}
                  price={cartItem.product.price}
                  format={cartItem.product.format}
                  imageUrl={cartItem.product.imageUrl}
                  updateItemQty={(qty) =>
                    this.props.updateItemQty(
                      this.props.auth.id,
                      cartItem.product,
                      qty
                    )
                  }
                  removeFromCart={() =>
                    this.props.removeFromCart(
                      this.props.auth.id,
                      cartItem.product
                    )
                  }
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total:</TableCell>
                <TableCell colSpan={2} />
                <TableCell>{formatUSD(getCartTotal(cart))}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="cart-foot">
            <button onClick={() => this.props.emptyCart(this.props.auth.id)}>
              Empty Cart
            </button>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        </TableContainer>
      );
    } else {
      return <div>Your cart is empty!</div>;
    }
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (userId) => dispatch(fetchCart(userId)),
  clearCart: () => dispatch(clearCart()),
  updateItemQty: (userId, product, qty) =>
    dispatch(updateItemQty(userId, product, qty)),
  removeFromCart: (userId, product) =>
    dispatch(removeFromCart(userId, product)),
  emptyCart: (userId) => dispatch(emptyCart(userId)),
});

export default connect(mapState, mapDispatch)(Cart);
