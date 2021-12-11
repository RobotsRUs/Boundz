import React from 'react';
import { formatUSD } from './utils';
import {
  TableRow,
  TableCell,
  Grid,
  Typography,
  IconButton,
  NativeSelect,
  Stack,
  Box,
} from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { qtyArray } from './utils';

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
      <NativeSelect
        id="qty"
        name="qty"
        value={qty}
        label="Format"
        onChange={(evt) => updateItemQty(+evt.target.value)}
      >
        {qtyArray().map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </NativeSelect>
      <IconButton onClick={() => removeFromCart()}>
        <RemoveShoppingCartIcon />
      </IconButton>
    </TableCell>
    <TableCell>{formatUSD(price * qty)}</TableCell>
  </TableRow>
);

export default CartItem;
