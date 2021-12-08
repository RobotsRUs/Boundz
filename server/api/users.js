const router = require('express').Router();
const {
  models: { User, CartItem },
} = require('../db/index');

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username'] });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId/cart
router.get('/users/:userId/cart', async (req, res, next) => {
  try {
    res.json(await CartItem.findByUserId(req.params.userId));
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:userId/cart
router.post('/users/:userId/cart', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, qty } = req.body;
    res.json(await CartItem.addItem(userId, productId, qty));
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:userId/cart/:productId
router.put('/users/:userId/cart/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { qty } = req.body;
    const updatedCartItem = await CartItem.updateItemQty(
      userId,
      productId,
      qty
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
router.delete('/users/:userId/cart/:productId', async (req, res, next) => {
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
router.delete('/users/:userId/cart', async (req, res, next) => {
  try {
    await CartItem.emptyCart(req.params.userId);
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
