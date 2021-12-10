/**
 * Format price (in cents) as USD
 * @param {Number} price The price in cents
 * @return {String} The price formatted in USD (i.e. $1.00)
 **/
export const formatUSD = (price) => `$${(price / 100).toFixed(2)}`;

/**
 * Get sum of line items in cart
 * @param {Object[]} cart Array of cart line-items
 * @return {Number} Sum of all line items in cart
 **/
export const getCartTotal = (cart) =>
  cart.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

/**
 * Get array of quantities
 * @param {Number} maxQty - default 10
 * @return {Number[]} Array of quantiies from 1 to maxQuantity
 */
export const qtyArray = (maxQty = 10) => {
  const qtyArray = new Array(maxQty);
  for (let i = 0; i < qtyArray.length; i++) {
    qtyArray[i] = i + 1;
  }
  return qtyArray;
};
