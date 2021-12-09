const router = require('express').Router();
const {
  models: { User, CartItem },
} = require('../db/index');

// GET /api/users/:userId/cart
router.get('/:userId/cart', async (req, res, next) => {
  console.log('get me');
  try {
    res.json(await CartItem.findByUserId(req.params.userId));
  } catch (err) {
    next(err);
  }
});

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username'] });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    console.log('This is req.body: ', req.body);
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:userId/cart
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    res.json(await CartItem.addItem(userId, productId, quantity));
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:userId/cart/:productId
router.put('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const updatedCartItem = await CartItem.updateItemQty(
      userId,
      productId,
      quantity
    );
    if (!updatedCartItem) {
      const error = new Error('Item not found in cart');
      error.status = 404;
      throw error;
    } else {
      res.json(updatedCartItem);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:userId/cart/:productId
router.delete('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const removedCartItem = await CartItem.removeItem(userId, productId);
    if (!removedCartItem) {
      const error = new Error('Item not found in cart');
      error.status = 404;
      throw error;
    } else {
      res.json(removedCartItem);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:userId/cart
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    await CartItem.emptyCart(req.params.userId);
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
