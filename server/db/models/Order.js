const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    validate: {
      isDate: true,
    },
  },
  address1: {
    type: Sequelize.STRING,
  },
  address2: {
    type: Sequelize.STRING,
  },
  ity: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [5, 5],
    },
  },
});

module.exports = Order;
