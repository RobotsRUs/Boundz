import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { updateUser } from '../store';

export class UpdateUserInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      userType: 'Customer',
    };

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
  }

  handleChangeEvent(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmitEvent(event) {
    event.preventDefault();
    this.props.updateUser({
      ...this.state,
    });
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      userType: '',
    });
  }

  render() {
    console.log('this is this.state', this.state);

    return (
      <div>
        <h1>
          WELCOME&nbsp;||&nbsp;BIENVENIDO&nbsp;||&nbsp;BIENVENUE&nbsp;||&nbsp;ДОБРО
          ПОЖАЛОВАТЬ(DOBRO POZHALOVAT')&nbsp;||&nbsp;ברוך הבא&nbsp;||&nbsp;أهلا
          بك&nbsp;||&nbsp;BIENVENI&nbsp;||&nbsp;환영하다&nbsp;||&nbsp;WELKOM&nbsp;||&nbsp;ようこそ
        </h1>
        <h1>to the Boundz</h1>
        <h1>
          FAMILY&nbsp;||&nbsp;FAMILIA&nbsp;||&nbsp;FAMILLE&nbsp;||&nbsp;СЕМЬЯ(SEM'YA)&nbsp;||&nbsp;מִשׁפָּחָה&nbsp;||&nbsp;أسرة&nbsp;||&nbsp;FANMI&nbsp;||&nbsp;가족&nbsp;||&nbsp;FAMILIE&nbsp;||&nbsp;家族
        </h1>

        <form onSubmit={this.handleSubmitEvent}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleChangeEvent}
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleChangeEvent}
            />
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={this.handleChangeEvent}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChangeEvent}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChangeEvent}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              onChange={this.handleChangeEvent}
            />
            <label>Address 1</label>
            <input
              type="text"
              name="address1"
              onChange={this.handleChangeEvent}
            />
            <label>Address 2</label>
            <input
              type="text"
              name="address2"
              onChange={this.handleChangeEvent}
            />
            <label>City</label>
            <input type="text" name="city" onChange={this.handleChangeEvent} />
            <label>State</label>
            <input type="text" name="state" onChange={this.handleChangeEvent} />
            <label>Zip Code</label>
            <input
              type="number"
              name="zipCode"
              onChange={this.handleChangeEvent}
            />
            <label>User Account Type</label>
            <select
              name="userType"
              defaultValue={this.state.userType}
              onChange={this.handleChangeEvent}
            >
              <option>Customer</option>
              <option>Administrator</option>
            </select>
          </div>
          <br />
          <button type="submit" onClick={this.handleSubmitEvent}>
            Update Info
          </button>
        </form>
      </div>
    );
  }
}

const mapUpdate = (state) => {
  return {
    name: 'update',
    displayName: 'Update Info',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      [event.target.name] = event.target.name.value;
      dispatch(authenticate(username, password));
    },
  };
};

export default connect(mapUpdate, { updateUser, mapDispatch })(UpdateUserInfo);
