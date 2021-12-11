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
import { Link } from 'react-router-dom';

const CartItem = ({
  qty,
  name,
  id,
  imageUrl,
  format,
  price,
  updateItemQty,
  removeFromCart,
}) => (
  <TableRow>
    <TableCell>
      <Stack direction="row" spacing={1}>
        <Box maxWidth={75}>
          <Link to={`/products/${id}`}>
            <img src={imageUrl} width="100%" />
          </Link>
        </Box>
        <Stack spacing={1}>
          <Link to={`/products/${id}`}>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
              {name}
            </Typography>
          </Link>
          <Typography sx={{ fontSize: '0.8rem' }}>Format: {format}</Typography>
        </Stack>
      </Stack>
    </TableCell>
    <TableCell>{formatUSD(price)}</TableCell>
    <TableCell>
      <Stack direction="row" spacing={1}>
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
      </Stack>
    </TableCell>
    <TableCell align="right">{formatUSD(price * qty)}</TableCell>
  </TableRow>
);

export default CartItem;
