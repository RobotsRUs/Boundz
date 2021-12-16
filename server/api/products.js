const router = require('express').Router();
const sequelize = require('sequelize');
const multer = require('multer');
const {
  models: { Product },
} = require('../db');

const upload = multer({ dest: './public/images/book-covers/' });

// Admin Gatekeeper Middleware
const adminGatekeeper = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    const err = new Error(
      'You must be an administrator to perform this action'
    );
    err.status = 401;
    next(err);
  }
};

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

// GET /api/products/categories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Product.findAll({
      attributes: ['category'],
      group: 'category',
      distinct: true,
      order: [['category', 'ASC']],
    });
    res.send(categories.map((category) => category.category));
  } catch (err) {
    next(err);
  }
});

// GET /api/products/publishers
router.get('/publishers', async (req, res, next) => {
  try {
    const publishers = await Product.findAll({
      attributes: ['publisher'],
      group: 'publisher',
      distinct: true,
      order: [['publisher', 'ASC']],
    });
    res.send(publishers.map((publisher) => publisher.publisher));
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
router.post(
  '/',
  adminGatekeeper,
  upload.single('imageFile'),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.imageUrl = `/images/book-covers/${req.file.filename}`;
      }
      const variations = [];
      // Create variations
      for (let book of JSON.parse(req.body.variations)) {
        const newBook = await Product.create({ ...req.body, ...book });
        variations.push(newBook);
      }

      // Create product
      const newProduct = await Product.create(req.body);
      res.json(await Product.findById(newProduct.id));
    } catch (err) {
      console.error(err);
    }
  }
);

// PUT /api/products
router.put(
  '/:productId',
  adminGatekeeper,
  upload.single('imageFile'),
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        const err = new Error('Not found');
        err.status = 404;
        throw err;
      }

      if (req.file) {
        req.body.imageUrl = `/images/book-covers/${req.file.filename}`;
      }

      const variations = JSON.parse(req.body.variations);
      const newVariations = [];

      // Destroy removed variations
      await product.removeOldVariations(variations);

      // Update variations
      for (let book of variations) {
        // Get product if it exists already
        const foundBook = await Product.findOne({
          where: {
            format: book.format,
            title: product.title,
          },
        });
        if (foundBook) {
          foundBook.set({
            ...req.body,
            format: book.format,
            price: book.price,
            ISBN13: book.ISBN13,
          });
          console.log(foundBook);
          await foundBook.save();
          newVariations.push(foundBook);
        } else {
          const newBook = await Product.create({
            ...req.body,
            format: book.format,
            price: book.price,
            ISBN13: book.ISBN13,
          });
          newVariations.push(newBook);
        }
      }

      // Update found product
      product.set(req.body);
      await product.save();
      product.dataValues.variations = newVariations;
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/products
router.delete('/:productId', adminGatekeeper, async (req, res, next) => {
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
