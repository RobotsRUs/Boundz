import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review({ cart, checkoutInfo }) {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zipCode,
    cardName,
    cardNumber,
    expDate,
  } = checkoutInfo;

  const addresses = [address1, address2, city, state, zipCode];

  const payments = [
    { name: 'Card holder', detail: cardName },
    {
      name: 'Card number',
      detail: `xxxx-xxxx-xxxx-${cardNumber.slice(cardNumber.length - 4)}`,
    },
    { name: 'Expiry date', detail: expDate },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((cartItem) => (
          <ListItem key={cartItem.product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`${cartItem.product.title} (Qty. ${cartItem.quantity})`}
              secondary={cartItem.product.format}
            />
            <Typography variant="body2">
              ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $
            {cart
              .reduce(
                (sum, cartItem) =>
                  sum + cartItem.product.price * cartItem.quantity,
                0
              )
              .toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName}
          </Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
