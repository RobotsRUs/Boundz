import React from 'react';
import { connect } from 'react-redux';
import { authenticate, updateUser } from '../store';

import { Typography, AppBar, TextField, Grid, Button } from '@mui/material';

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
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    console.log('this is this.state', this.state);

    return (
      <div>
        <AppBar position="sticky">
          <div>
            <h1 className="centered">
              WELCOME👐BIENVENIDO👐BIENVENUE👐ДОБРО ПОЖАЛОВАТЬ👐أهلا بك
              👐BIENVENI👐환영하다👐WELKOM👐ようこそ👐ברוך הבא
            </h1>
            <h1 className="centered">to the Boundz</h1>
            <h1 className="centered">
              FAMILY👐FAMILIA👐FAMILLE👐СЕМЬЯ👐أسرة👐FANMI👐가족👐FAMILIE👐家族👐מִשׁפָּחָה
            </h1>
          </div>
        </AppBar>
        <br />

        <Typography variant="h4">Update Account Info</Typography>
        <br />

        <Grid container spacing={3} onSubmit={this.handleSubmitEvent}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              fullWidth
              type="text"
              label="First Name"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              fullWidth
              type="text"
              label="Last Name"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="userName"
              name="userName"
              fullWidth
              type="text"
              label="Username"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          {/* <Grid item xs={12}></Grid>
          <br /> */}

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={18}>
            <TextField
              required
              id="email"
              name="email"
              fullWidth
              type="email"
              label="Primary Email Address"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="tel"
              name="tel"
              fullWidth
              type="tel"
              label="Phone Number"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              fullWidth
              type="text"
              label="Street Address"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={12}>
            <TextField
              required
              id="address2"
              name="address2"
              fullWidth
              type="text"
              label="Street Address"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={4}>
            <TextField
              required
              id="city"
              name="city"
              fullWidth
              type="text"
              label="City"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={4}>
            <TextField
              required
              id="state"
              name="state"
              fullWidth
              type="text"
              label="State"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={4}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              fullWidth
              type="text"
              label="Zip Code"
              variant="outlined"
              onChange={this.handleChangeEvent}
            />
          </Grid>
          <br />

          <Grid item xs={9} /*justifyContent="flex-end"*/>
            <Button
              color="primary"
              variant="outlined"
              onSubmit={this.handleSubmit}
            >
              Update Account Information
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {};

export default connect(null, { updateUser, mapDispatch })(UpdateUserInfo);
