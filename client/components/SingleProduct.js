import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProduct, clearProduct, addToCart } from '../store';
import Loading from './Loading';
import { formatUSD, qtyArray } from './utils';
import NativeSelect from '@mui/material/NativeSelect';
import {
  Alert,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Grid,
  Stack,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 0,
      qty: 1,
      tab: 0,
      alert: '',
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.book.id !== prevProps.book.id) {
      this.setState({ format: this.props.book.id });
    }
  }

  componentWillUnmount() {
    this.props.clearProduct();
    clearTimeout(this.alertsTimeout);
  }

  handleFormatChange(evt) {
    this.props.fetchProduct(evt.target.value);
  }

  handleQtyChange(evt) {
    this.setState({ qty: evt.target.value });
  }

  handleAddToCart(evt) {
    evt.preventDefault();
    const userId = this.props.auth.id;
    this.props.addToCart(userId, this.props.book, +this.state.qty);
    this.setState({
      alert: `"${this.props.book.title}" has been added to your cart`,
    });
    this.alertsTimeout = setTimeout(() => this.setState({ alert: '' }), 5000);
  }

  handleTabChange(evt, newTab) {
    this.setState({ tab: newTab });
  }

  render() {
    if (!this.props.book.id) {
      return <Loading />;
    } else {
      const {
        id,
        title,
        author,
        summary,
        description,
        format,
        ISBN13,
        imageUrl,
        price,
        length,
        publisher,
        category,
        variations,
      } = this.props.book;
      return (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Collapse in={!!this.state.alert}>
            <Alert
              action={
                <Link to="/cart">
                  <Button size="small">VIEW CART</Button>
                </Link>
              }
            >
              {this.state.alert}
            </Alert>
          </Collapse>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item>
              <img className="cover-art" src={imageUrl} />
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={4}>
                <Grid item container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="subtitle">by {author}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {formatUSD(price)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{description}</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <FormControl>
                        <InputLabel htmlFor="format">Format</InputLabel>
                        <NativeSelect
                          id="format"
                          name="format"
                          value={this.state.format}
                          label="Format"
                          onChange={this.handleFormatChange}
                        >
                          <option value={id}>{format}</option>
                          {variations.map((variation) => (
                            <option key={variation.id} value={variation.id}>
                              {variation.format}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <InputLabel htmlFor="qty">Qty</InputLabel>
                        <NativeSelect
                          id="qty"
                          name="qty"
                          value={this.state.qty}
                          label="Format"
                          onChange={this.handleQtyChange}
                        >
                          {qtyArray().map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                          onClick={this.handleAddToCart}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Details" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={this.state.tab} index={0}>
              <Typography>{summary}</Typography>
            </TabPanel>
            <TabPanel value={this.state.tab} index={1}>
              <ul>
                <li>Publisher: {publisher}</li>
                <li>Length: {length}</li>
                <li>ISBN13: {ISBN13}</li>
                <li>Category: {category}</li>
              </ul>
            </TabPanel>
          </Box>
        </Stack>
      );
    }
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const mapState = (state) => ({
  book: state.singleProduct,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchProduct: (productName) => dispatch(fetchProduct(productName)),
  clearProduct: () => dispatch(clearProduct()),
  addToCart: (userId, product, qty) =>
    dispatch(addToCart(userId, product, qty)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
