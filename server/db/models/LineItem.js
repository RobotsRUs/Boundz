const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./Order');
const Product = require('./Product');

const LineItem = db.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

LineItem.findByUserId = async function (userId) {
  return await this.findAll({
    include: [
      Product,
      {
        model: Order,
        where: { userId, fulfilled: false },
      },
    ],
  });
};

LineItem.addItem = async function (userId, productId, quantity) {
  const [order] = await Order.findOrCreate({
    where: { userId, fulfilled: false },
  });
  const [cartItem] = await this.findOrCreate({
    where: {
      orderId: order.id,
      productId,
    },
    include: Product,
  });
  cartItem.quantity += quantity;
  await cartItem.save();
  return cartItem;
};

LineItem.updateItemQty = async function (userId, productId, quantity) {
  const cartItem = await this.findOne({
    where: {
      productId,
    },
    include: [
      Product,
      {
        model: Order,
        where: { userId, fulfilled: false },
      },
    ],
  });
  if (!cartItem) {
    console.error(
      `Attempted to update quantity of a cart item that does not exist.  userId: ${userId}, productId: ${productId}, quantity: ${quantity}`
    );
    return;
  } else {
    cartItem.quantity = quantity;
    await cartItem.save();
    return cartItem;
  }
};

LineItem.removeItem = async function (userId, productId) {
  const cartItem = await this.findOne({
    where: {
      productId,
    },
    include: [
      Product,
      {
        model: Order,
        where: { userId, fulfilled: false },
      },
    ],
  });
  if (!cartItem) {
    return;
  } else {
    await cartItem.destroy();
    return cartItem;
  }
};

LineItem.emptyCart = async function (userId) {
  await Order.destroy({
    where: { userId, fulfilled: false },
  });
};

module.exports = LineItem;
