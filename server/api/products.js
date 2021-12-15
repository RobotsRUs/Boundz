const router = require('express').Router();
const sequelize = require('sequelize');
const {
  models: { Product },
} = require('../db');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      group: ['id', 'title'],
      distinct: true,
    });
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const variations = [];
    // Create variations
    for (let book of req.body.variations) {
      const newBook = await Product.create({ ...req.body, ...book });
      variations.push(newBook);
    }

    // Create product
    const newProduct = await Product.create(req.body);
    res.json(await Product.findById(newProduct.id));
  } catch (err) {
    console.error(err);
  }
});

// PUT /api/products
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      const err = new Error('Not found');
      err.status = 404;
      throw err;
    } else {
      const newVariations = [];

      // Destroy removed variations
      await product.removeOldVariations(req.body.variations);

      // Update variations
      for (let book of req.body.variations) {
        // Get product if it exists already
        const foundBook = book.id ? await Product.findByPk(book.id) : null;
        if (foundBook) {
          for (let key in req.body) {
            foundBook[key] = req.body[key];
          }
          for (let key in book) {
            foundBook[key] = book[key];
          }
          await foundBook.save();
          newVariations.push(foundBook);
        } else {
          const newBook = await Product.create({ ...req.body, ...book });
          newVariations.push(newBook);
        }
      }
    }

    // Update found product
    for (let key in req.body) {
      product[key] = req.body[key];
    }

    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products
router.delete('/:productId', async (req, res, next) => {
  try {
    const book = await Product.findByPk(req.params.productId);
    if (!book) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    }
    await book.destroyProductAndVariations();
    res.json(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
