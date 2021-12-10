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
  try {
    return await this.findAll({
      include: [
        Product,
        {
          model: Order,
          where: { userId, fulfilled: false },
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
};

LineItem.addItem = async function (userId, productId, quantity) {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

LineItem.updateItemQty = async function (userId, productId, quantity) {
  try {
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
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    }
  } catch (err) {
    console.error(err);
  }
};

LineItem.removeItem = async function (userId, productId) {
  try {
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
  } catch (err) {
    console.error(err);
  }
};

LineItem.emptyCart = async function (userId) {
  try {
    await Order.destroy({
      where: { userId, fulfilled: false },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = LineItem;
