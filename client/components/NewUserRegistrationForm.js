import * as React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

import { Typography, TextField, Grid, Button } from '@mui/material';

export class NewUserRegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
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
    this.props.handleSubmit(this.state, 'signup');
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h4">Register Your Account Here Today!</Typography>

        <form onSubmit={this.handleSubmitEvent}>
          <Grid container spacing={3}>
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
                id="username"
                name="username"
                fullWidth
                type="text"
                label="Username"
                variant="outlined"
                onChange={this.handleChangeEvent}
              />
            </Grid>
            <br />

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

            <Grid item container xs={6} sm={12} justifyContent="flex-end">
              <Button color="primary" variant="outlined" type="sumbit">
                Complete Registration
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(userObject, method) {
      dispatch(authenticate(userObject, method));
    },
  };
};

export default connect(null, mapDispatch)(NewUserRegistrationForm);
