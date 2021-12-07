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
    type: Sequelize.STRING,
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
    unique: true,
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
    type: Sequelize.STRING,
    allowNull: false,
  },
  publisher: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
});

// Class Methods:
Product.findById = async function (id) {
  const foundBook = await this.findByPk(id);
  if (foundBook) {
    foundBook.dataValues.variations = await this.findAll({
      where: {
        title: foundBook.title,
        id: { [Sequelize.Op.not]: foundBook.id },
      },
    });
  }
  return foundBook;
};

module.exports = Product;
