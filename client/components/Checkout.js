import React from 'react';
import { connect } from 'react-redux';

import Cart from './Cart';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    };
  }
  render() {
    return (
      <div className="checkout">
        <form className="checkout-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address1">Address (line 1)</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={this.state.address1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address (line 2)</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={this.state.address2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={this.state.city} />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={this.state.state}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">Zip</label>
            <input
              type="text"
              id="state"
              name="state"
              value={this.state.state}
            />
          </div>
        </form>
        <Cart />
      </div>
    );
  }
}

const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(Checkout);
