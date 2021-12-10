import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, clearProduct, addToCart } from '../store';
import Loading from './Loading';
import { formatUSD } from './utils';

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
        <div className="single-product">
          <div className="product-header">
            <div className="left-col">
              <img className="cover-art" src={imageUrl} />
            </div>
            <div className="right-col">
              <h2 className="title">{title}</h2>
              <h3 className="author">by {author}</h3>
              <p className="price">{formatUSD(price)}</p>
              <p className="description">{description}</p>
              <form className="add-to-cart-form">
                <div className="format-field">
                  <label htmlFor="format">Format</label>
                  <select
                    id="format"
                    name="format"
                    value={this.state.format}
                    onChange={this.handleFormatChange}
                  >
                    <option value={id}>{format}</option>
                    {variations &&
                      variations.map((variation) => (
                        <option key={variation.id} value={variation.id}>
                          {variation.format}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="add-to-cart-field">
                  <label htmlFor="qty">Qty</label>
                  <select
                    id="qty"
                    name="qty"
                    onChange={this.handleQtyChange}
                    value={this.state.qty}
                  >
                    {[...Array(10).keys()].map((qty) => (
                      <option key={qty + 1} value={qty + 1}>
                        {qty + 1}
                      </option>
                    ))}
                  </select>
                  <button id="add-to-cart" onClick={this.handleAddToCart}>
                    ADD TO CART
                  </button>
                </div>
              </form>
            </div>
          </div>
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
        </div>
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
