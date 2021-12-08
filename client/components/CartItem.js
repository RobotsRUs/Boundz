import React from 'react';

const CartItem = ({ name, price, qty }) => (
  <tr className="cartItem">
    <td>{qty}</td>
    <td>{name}</td>
    <td>{price}</td>
  </tr>
);

export default CartItem;
