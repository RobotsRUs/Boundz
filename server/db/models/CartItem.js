const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

CartItem.findByUserId = async function (userId) {
  try {
    return await this.findAll({
      where: {
        userId,
      },
      include: Product,
    });
  } catch (err) {
    console.error(err);
  }
};

CartItem.addItem = async function (userId, productId, qty) {
  try {
    const [cartItem, wasCreated] = await this.findOrCreate({
      where: {
        userId,
        productId,
      },
      defaults: { qty },
      include: Product,
    });
    return cartItem;
  } catch (err) {
    console.error(err);
  }
};

CartItem.updateItemQty = async function (userId, productId, qty) {
  try {
    const cartItem = await this.findOne({
      where: {
        userId,
        productId,
      },
      include: Product,
    });
    if (!cartItem) {
      return;
    } else {
      cartItem.qty = qty;
      await cartItem.save();
      return cartItem;
    }
  } catch (err) {
    console.error(err);
  }
};

CartItem.removeItem = async function (userId, productId) {
  try {
    const cartItem = await this.findOne({
      where: {
        userId,
        productId,
      },
      include: Product,
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

CartItem.emptyCart = async function (userId) {
  try {
    await this.destroy({
      where: {
        userId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = CartItem;
