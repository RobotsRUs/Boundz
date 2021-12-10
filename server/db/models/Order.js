const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
    validate: {
      isDate: true,
    },
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  address1: {
    type: Sequelize.STRING,
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
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
