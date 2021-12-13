import React from 'react';
import { formatUSD } from './utils';

const CartItem = ({
  qty,
  name,
  format,
  price,
  updateItemQty,
  removeFromCart,
}) => (
  <tr className="cartItem">
    <td>
      <select value={qty} onChange={(evt) => updateItemQty(+evt.target.value)}>
        {[...Array(10).keys()].map((qty) => (
          <option key={qty + 1} value={qty + 1}>
            {qty + 1}
          </option>
        ))}
      </select>
    </td>
    <td>{name}</td>
    <td>{format}</td>
    <td>{formatUSD(price)}</td>
    <td>{formatUSD(price * qty)}</td>
    <td>
      <button onClick={() => removeFromCart()}>X</button>
    </td>
  </tr>
);

export default CartItem;
