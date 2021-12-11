import React from 'react';
import { formatUSD } from './utils';
import { TableRow, TableCell, Grid, Typography } from '@mui/material';

const CartItem = ({
  qty,
  name,
  imageUrl,
  format,
  price,
  updateItemQty,
  removeFromCart,
}) => (
  <TableRow>
    <TableCell>
      <Grid container spacing={1}>
        <Grid item maxWidth={75}>
          <img src={imageUrl} width="100%" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="subtitle2">{format}</Typography>
        </Grid>
      </Grid>
    </TableCell>
    <TableCell>{formatUSD(price)}</TableCell>
    <TableCell>
      <select value={qty} onChange={(evt) => updateItemQty(+evt.target.value)}>
        {[...Array(10).keys()].map((qty) => (
          <option key={qty + 1} value={qty + 1}>
            {qty + 1}
          </option>
        ))}
      </select>
    </TableCell>
    <TableCell>{formatUSD(price * qty)}</TableCell>
    <TableCell>
      <button onClick={() => removeFromCart()}>X</button>
    </TableCell>
  </TableRow>
);

export default CartItem;
