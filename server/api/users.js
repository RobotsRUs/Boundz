const router = require('express').Router();
const {
  models: { User, LineItem, Order },
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
router.get('/:userId/cart', async (req, res, next) => {
  try {
    res.json(await LineItem.findByUserId(req.params.userId));
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:userId/cart
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    res.json(await LineItem.addItem(userId, productId, quantity));
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:userId/cart/:productId
router.put('/:userId/cart/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    const updatedCartItem = await LineItem.updateItemQty(
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
    const removedCartItem = await LineItem.removeItem(userId, productId);
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
    await LineItem.emptyCart(req.params.userId);
    res.json();
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:userId/checkout
router.post('/:userId/checkout', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { checkoutInfo, cart } = req.body;

    if (userId === 'guest') {
      // If checking out as guest:
      const order = await Order.create({
        ...checkoutInfo,
        fulfilled: true,
        date: new Date(),
      });
      await Promise.all(
        cart.map((item) =>
          LineItem.create({
            orderId: order.id,
            productId: item.product.id,
            quantity: item.quantity,
          })
        )
      );
      res.json(order.id);
    } else {
      // If checking out as logged in user:
      const order = await Order.findOne({
        where: {
          fulfilled: false,
          userId,
        },
      });
      await order.update({
        ...checkoutInfo,
        fulfilled: true,
        date: new Date(),
      });
      res.json(order.id);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
