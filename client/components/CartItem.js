import React from 'react';

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
        {/* o: refactor into its own function */}
        {[...Array(10).keys()].map((qty) => (
          <option key={qty + 1} value={qty + 1}>
            {qty + 1}
          </option>
        ))}
      </select>
    </td>
    <td>{name}</td>
    <td>{format}</td>
    <td>{`$${(+price).toFixed(2)}`}</td>
    <td>{`$${(+price * qty).toFixed(2)}`}</td>
    <td>
      <button onClick={() => removeFromCart()}>X</button>
    </td>
  </tr>
);

export default CartItem;
