import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import creditCardValidateExpiry from 'credit-card-expiry-validator';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { fetchCart, emptyCart } from '../../store';
import { CircularProgress } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const theme = createTheme();

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      checkoutInfo: {},
    };
    this.setActiveStep = this.setActiveStep.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validate(step) {
    const {
      firstName,
      lastName,
      address1,
      city,
      state,
      zipCode,
      expDate,
      cardName,
      cardNumber,
      cvv,
    } = this.state.checkoutInfo;
    switch (step) {
      case 0:
        return (
          !!firstName &&
          !!lastName &&
          !!address1 &&
          !!city &&
          !!state &&
          /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode)
        );
      case 1:
        return (
          cardName &&
          cardNumber &&
          cvv &&
          expDate &&
          !creditCardValidateExpiry.isExpiryInvalid(expDate)
        );
      default:
        return true;
    }
  }

  setActiveStep(activeStep) {
    this.setState({ activeStep });
    if (activeStep === steps.length) {
      this.submitOrder();
    }
  }

  async submitOrder() {
    const checkoutInfo = { ...this.state.checkoutInfo };
    delete checkoutInfo.id;
    const { data: confirmation } = await axios.post(
      `/api/users/${this.props.auth.id || 'guest'}/checkout`,
      { checkoutInfo, cart: this.props.cart }
    );
    this.props.emptyCart();
    this.setState({ confirmation: confirmation });
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
    this.setState({
      checkoutInfo: {
        ...this.props.auth,
        cardName: `${this.props.auth.firstName || ''} ${
          this.props.auth.lastName || ''
        }`,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.id !== this.props.auth.id) {
      this.setState({
        checkoutInfo: {
          ...this.props.auth,
          cardName: `${this.props.auth.firstName} ${this.props.auth.lastName}`,
        },
      });
    }
  }

  handleChange(evt) {
    this.setState({
      checkoutInfo: {
        ...this.state.checkoutInfo,
        [evt.target.name]: evt.target.value,
      },
    });
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            checkoutInfo={this.state.checkoutInfo}
            handleChange={this.handleChange}
          />
        );
      case 1:
        return (
          <PaymentForm
            checkoutInfo={this.state.checkoutInfo}
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <Review
            cart={this.props.cart}
            checkoutInfo={this.state.checkoutInfo}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  render() {
    const { activeStep } = this.state;
    const setActiveStep = this.setActiveStep;
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                this.state.confirmation ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is {this.state.confirmation}. We will
                      send you an update when your order has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Container align="center">
                    <CircularProgress />
                  </Container>
                )
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      disabled={!this.validate(activeStep)}
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (userId) => dispatch(fetchCart(userId)),
  emptyCart: () => dispatch(emptyCart()),
});

export default connect(mapState, mapDispatch)(Checkout);
