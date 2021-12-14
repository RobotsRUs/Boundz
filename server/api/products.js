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
      throw err;
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/products
router.post('/', (req, res, next) => {});

// PUT /api/products
router.put('/', (req, res, next) => {});

// DELETE /api/products
router.delete('/', (req, res, next) => {});

module.exports = router;
