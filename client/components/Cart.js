import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearCart,
  emptyCart,
  fetchCart,
  removeFromCart,
  updateItemQty,
} from '../store';
import CartItem from './CartItem';
import { formatUSD, getCartTotal } from './utils';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDialog: false,
    };
    this.showDialogue = this.showDialogue.bind(this);
  }

  showDialogue(visibility) {
    this.setState({ displayDialog: visibility });
  }

  componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id) {
      this.props.fetchCart(this.props.auth.id);
    }
  }

  render() {
    const { cart } = this.props;
    if (cart.length) {
      return (
        <>
          <Stack spacing={5}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((cartItem) => (
                    <CartItem
                      key={cartItem.product.id}
                      id={cartItem.product.id}
                      name={cartItem.product.title}
                      qty={cartItem.quantity}
                      price={cartItem.product.price}
                      format={cartItem.product.format}
                      imageUrl={cartItem.product.imageUrl}
                      updateItemQty={(qty) =>
                        this.props.updateItemQty(
                          this.props.auth.id,
                          cartItem.product,
                          qty
                        )
                      }
                      removeFromCart={() =>
                        this.props.removeFromCart(
                          this.props.auth.id,
                          cartItem.product
                        )
                      }
                    />
                  ))}
                  <TableRow>
                    <TableCell>Total:</TableCell>
                    <TableCell colSpan={2} />
                    <TableCell align="right">
                      {formatUSD(getCartTotal(cart))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                endIcon={<RemoveShoppingCartIcon />}
                onClick={() => {
                  this.showDialogue(true);
                }}
              >
                Empty Cart
              </Button>
              <Link to="/checkout">
                <Button
                  variant="contained"
                  endIcon={<ShoppingCartCheckoutIcon />}
                >
                  Checkout
                </Button>
              </Link>
            </Stack>
          </Stack>

          {/* Empty Cart Dialog */}
          <Dialog
            open={this.state.displayDialog}
            onClose={() => {
              this.showDialogue(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Empty cart</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove all items from your cart?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  this.showDialogue(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  this.props.emptyCart(this.props.auth.id);
                  this.showDialogue(false);
                }}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else {
      return <Typography>Your shopping cart is empty.</Typography>;
    }
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (userId) => dispatch(fetchCart(userId)),
  clearCart: () => dispatch(clearCart()),
  updateItemQty: (userId, product, qty) =>
    dispatch(updateItemQty(userId, product, qty)),
  removeFromCart: (userId, product) =>
    dispatch(removeFromCart(userId, product)),
  emptyCart: (userId) => dispatch(emptyCart(userId)),
});

export default connect(mapState, mapDispatch)(Cart);
