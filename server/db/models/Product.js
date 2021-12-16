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
    allowNull: false,
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
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
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

// Instance Methods
Product.prototype.removeOldVariations = async function (newVariations) {
  const formats = [this.format, ...newVariations.map((book) => book.format)];
  try {
    await Product.destroy({
      where: {
        title: this.dataValues.title,
        [Sequelize.Op.not]: {
          format: {
            [Sequelize.Op.or]: formats,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

Product.prototype.destroyProductAndVariations = async function () {
  try {
    await Product.destroy({
      where: {
        title: this.dataValues.title,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = Product;
