import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProductsThunk } from '../store/products';
import { formatUSD } from './utils';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
  IconButton,
  Collapse,
  Pagination,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

//Expanded button still not functional, Work in progress

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      expanded: false,
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
      <Grid container spacing={0.5} justifyContent="space-evenly">
        {allProducts.map((product) => (
          <Grid key={product.id} item xs={2.5}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="400"
                image={`${product.imageUrl}`}
                alt={`${product.title}`}
              />
              <CardContent>
                <Typography>{product.title}</Typography>

                <Typography variant="body2">{product.author}</Typography>
                <Typography variant="body2">
                  {product.minprice === product.maxprice
                    ? formatUSD(product.maxprice)
                    : `${formatUSD(product.minprice)} - ${formatUSD(
                        product.maxprice
                      )}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/products/${product.id}`}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <ExpandMore
                  expand={this.state.expanded}
                  onClick={this.handleExpandedClick}
                  aria-expanded={this.state.expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography>{product.description}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
        <Stack spacing={2}>
          <Pagination
            count={
              allProducts.length ? Math.ceil(allProducts[0].totalcount / 12) : 1
            }
            page={this.state.currentPage}
            onChange={this.handleChange}
          />
        </Stack>
      </Grid>
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
