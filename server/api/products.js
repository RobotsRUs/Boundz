const router = require('express').Router();
const {
  models: { Product },
} = require('../db');

// GET /api/products
router.get('/', (req, res, next) => {});

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
