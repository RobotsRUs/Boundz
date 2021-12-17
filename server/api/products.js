const router = require('express').Router();
const sequelize = require('sequelize');
const multer = require('multer');
const {
  db,
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
  const page = +req.query.page || 1;
  const count = +req.query.count || 12;
  const { author, category, title } = req.query;
  const filters = [];
  if (author) filters.push(`author ILIKE '%${author}%'`);
  if (category) filters.push(`category ILIKE '${category}'`);
  if (title) filters.push(`title ILIKE '%${title}%'`);
  try {
    const QUERY = `
    WITH added_row_number AS (
      SELECT
        *, MIN(PRICE) OVER(PARTITION BY title) AS minPrice, MAX(PRICE) OVER(PARTITION BY title) AS maxPrice,
        ROW_NUMBER() OVER(PARTITION BY title ORDER BY price DESC) AS row_number
      FROM products ${filters.length ? `WHERE ${filters.join(' AND ')}` : ''}
    )
    SELECT
    id, title, author, description, summary, format, "ISBN13", "imageUrl", price, length, publisher, category, minPrice, maxPrice, count(*) OVER() as totalCount
    FROM added_row_number
    WHERE row_number = 1
    LIMIT ${count} OFFSET ${(page - 1) * count};
    `;
    const products = await db.query(QUERY, { model: Product });
    const totalPages = products.length
      ? Math.ceil(products[0].dataValues.totalcount / count)
      : 1;
    res.set('totalPages', totalPages);
    res.set('Access-Control-Expose-Headers', 'totalPages');
    res.send(products);
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
  } catch (err) {
    next(err);
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
