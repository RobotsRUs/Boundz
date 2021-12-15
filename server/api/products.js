const router = require('express').Router();
const sequelize = require('sequelize');
const multer = require('multer');
const {
  db,
  models: { Product },
} = require('../db');

const upload = multer({ dest: './public/images/book-covers/' });

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const QUERY = `
    WITH added_row_number AS (
      SELECT
        *, MIN(PRICE) OVER(PARTITION BY title) AS minPrice, MAX(PRICE) OVER(PARTITION BY title) AS maxPrice,
        ROW_NUMBER() OVER(PARTITION BY title ORDER BY price DESC) AS row_number
      FROM products
    )
    SELECT
    id, title, author, description, summary, format, "ISBN13", "imageUrl", price, length, publisher, category, minPrice, maxPrice
    FROM added_row_number
    WHERE row_number = 1;
    `;
    const allProducts = await db.query(QUERY, { model: Product });
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
router.post('/', upload.single('imageFile'), async (req, res, next) => {
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
});

// PUT /api/products
router.put(
  '/:productId',
  upload.single('imageFile'),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.imageUrl = `/images/book-covers/${req.file.filename}`;
      }
      const product = await Product.findById(req.params.productId);
      if (!product) {
        const err = new Error('Not found');
        err.status = 404;
        throw err;
      } else {
        const variations = JSON.parse(req.body.variations);
        const newVariations = [];

        // Destroy removed variations
        await product.removeOldVariations(variations);

        // Update variations
        for (let book of variations) {
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
  }
);

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
