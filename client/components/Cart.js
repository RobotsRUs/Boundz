import React from 'react';
import { connect } from 'react-redux';
import { clearCart, fetchCart } from '../store';
import CartItem from './CartItem';

class Cart extends React.Component {
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
        <table className="cart">
          <thead>
            <tr>
              <td>Qty</td>
              <td>Name</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <CartItem
                name={cartItem.product.title}
                qty={cartItem.quantity}
                price={cartItem.product.price}
                key={cartItem.product.id}
              />
            ))}
          </tbody>
        </table>
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
});

export default connect(mapState, mapDispatch)(Cart);
