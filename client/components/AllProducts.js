import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProductsThunk } from '../store/products';
import { formatUSD } from './utils';
import { Link } from 'react-router-dom';

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProductsThunk();
  }

  render() {
    const allProducts = this.props.products;
    return (
      <div>
        <h1> Book Inventory</h1>
        <hr />
        {allProducts.map((product) => (
          <div key={product.id}>
            <div>
              <hr />
              <img src={`${product.imageUrl}`} />
              <Link to={`/products/${product.id}`}>
                <h2>{product.title}</h2>
              </Link>
              <h3>by: {product.author}</h3>
              <h3>{formatUSD(product.price)}</h3>
              <h3>{product.description}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductsThunk: () => dispatch(fetchAllProductsThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
