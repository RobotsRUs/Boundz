import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProductsThunk } from '../store/products';
import { Grid, Pagination, Stack } from '@mui/material';
import ProductCard from './ProductCard';

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
    };
    this.handleExpandedClick = this.handleExpandedClick.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.handleChange.bind(this);
  }

  handleExpandedClick = () => {
    this.setState = {
      expanded: !this.state.expanded,
    };
  };

  loadPage = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.currentPage) {
      this.setState({
        currentPage: page,
      });
    }
    return this.props.fetchAllProductsThunk(params);
  };

  handleChange = (event) => {
    this.setState({
      currentPage: parseInt(event.target.outerText),
    });
  };

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const params = new URLSearchParams(location.search);
      params.set('page', this.state.currentPage);
      const query = params.toString();
      this.props.fetchAllProductsThunk(query);
    }
  }
  render() {
    const allProducts = this.props.products;
    return (
      <>
        <Grid container spacing={0.5} justifyContent="space-evenly">
          {allProducts.map((product) => (
            <Grid key={product.id} item xs={2.5}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Stack
          spacing={2}
          paddingTop={2}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Pagination
            count={
              allProducts.length ? Math.ceil(allProducts[0].totalcount / 12) : 1
            }
            page={this.state.currentPage}
            onChange={this.handleChange}
            hidePrevButton
            hideNextButton
          />
        </Stack>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductsThunk: (query) => dispatch(fetchAllProductsThunk(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
