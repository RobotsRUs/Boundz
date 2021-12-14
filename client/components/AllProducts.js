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
      expanded: false,
    };
    this.handleExpandedClick = this.handleExpandedClick.bind(this);
  }

  handleExpandedClick = () => {
    this.setState = {
      expanded: !this.state.expanded,
    };
  };

  componentDidMount() {
    this.props.fetchAllProductsThunk();
  }

  render() {
    const allProducts = this.props.products;
    return (
      <Grid container spacing={0.5}>
        {allProducts.map((product) => (
          <Grid key={product.id} item xs={4}>
            <Card sx={{ maxWidth: 400 }}>
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
                  {formatUSD(product.price)}
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
                  onClick={this.handleExpandClick}
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
      </Grid>
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
