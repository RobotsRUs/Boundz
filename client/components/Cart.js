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
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                <td>Qty</td>
                <td>Name</td>
                <td>Format</td>
                <td>Price</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <CartItem
                  key={cartItem.product.id}
                  name={cartItem.product.title}
                  qty={cartItem.quantity}
                  price={cartItem.product.price}
                  format={cartItem.product.format}
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
            </tbody>
            <tfoot>
              <tr>
                <td>Total:</td>
                <td>{formatUSD(getCartTotal(cart))}</td>
              </tr>
            </tfoot>
          </table>
          <div className="cart-foot">
            <button onClick={() => this.props.emptyCart(this.props.auth.id)}>
              Empty Cart
            </button>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        </div>
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
