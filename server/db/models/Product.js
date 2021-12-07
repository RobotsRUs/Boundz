const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  format: {
    type: Sequelize.ENUM('hardcover', 'paperback', 'ebook'),
    defaultValue: 'hardcover',
    allowNull: false,
  },
  ISBN13: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    //defaultValue: find default photo for public folder
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  length: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
