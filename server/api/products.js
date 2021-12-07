const router = require('express').Router();

// GET /api/products
router.get('/', (req, res, next) => {});

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  // ------------
  // Temporary until Product model is set up:
  const book = [];
  book[0] = {
    imageUrl:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982168018/taste-9781982168018_lg.jpg',
    id: 1,
    title: 'Taste: My Life Through Food',
    author: 'Standley Tucci',
    format: 'Hardcover',
    price: 28,
    description: 'lorem',
    summary: 'lorem',
    variations: [book[2]],
    publisher: 'Gallery Books',
    length: '304 pages',
    isbn13: '123453462',
    category: 'food',
  };
  book[2] = {
    imageUrl:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982168018/taste-9781982168018_lg.jpg',
    id: 2,
    title: 'Taste: My Life Through Food',
    author: 'Standley Tucci',
    format: 'Ebook',
    price: 14.99,
    description: 'lorem',
    summary: 'lorem',
    variations: [book[0]],
    publisher: 'Gallery Books',
    length: '304 pages',
    isbn13: '123453462',
    category: 'food',
  };

  book[1] = {
    imageUrl:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982168018/taste-9781982168018_lg.jpg',
    id: 1,
    title: 'Taste: My Life Through Food',
    author: 'Standley Tucci',
    format: 'Hardcover',
    price: 28,
    description: 'lorem',
    summary: 'lorem',
    variations: [book[2]],
    publisher: 'Gallery Books',
    length: '304 pages',
    isbn13: '123453462',
    category: 'food',
  };

  const Product = {
    findById(id) {
      return book[id];
    },
  };

  // -----------

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
