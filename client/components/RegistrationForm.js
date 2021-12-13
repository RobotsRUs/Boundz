import React from 'react';
import { connect } from 'react-redux';
import { authenticate, createUser } from '../store';

export class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
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
    this.props.createUser({
      ...this.state,
    });
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
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
            Complete Registration
          </button>
        </form>
      </div>
    );
  }
}

const mapRegistration = (state) => {
  return {
    name: 'registration',
    displayName: 'Register Here',
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

export default connect(mapRegistration, {
  mapDispatch,
  authenticate,
  createUser,
})(RegistrationForm);
