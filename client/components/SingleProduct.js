import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, clearProduct, addToCart } from '../store';
import Loading from './Loading';
import { formatUSD, qtyArray } from './utils';
import NativeSelect from '@mui/material/NativeSelect';
import { FormControl, InputLabel, Grid, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 0,
      qty: 1,
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
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
        <Grid>
          <Grid container>
            <Grid item>
              <img className="cover-art" src={imageUrl} />
            </Grid>
            <Grid item>
              <h2 className="title">{title}</h2>
              <h3 className="author">by {author}</h3>
              <p className="price">{formatUSD(price)}</p>
              <p className="description">{description}</p>
              <form className="add-to-cart-form">
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
                <div>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    onClick={this.handleAddToCart}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </div>
              </form>
            </Grid>
          </Grid>
          <div className="product-body">
            <p className="summary">{summary}</p>
            <div className="product-details">
              <ul>
                <li>Publisher: {publisher}</li>
                <li>Length: {length}</li>
                <li>ISBN13: {ISBN13}</li>
                <li>Category: {category}</li>
              </ul>
            </div>
          </div>
        </Grid>
      );
    }
  }
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
