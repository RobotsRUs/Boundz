const db = require('./db');

// require models:
const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');
const LineItem = require('./models/LineItem');
const CartItem = require('./models/CartItem');

// associate models:
User.belongsToMany(Product, { through: 'Cart' });
Product.belongsToMany(User, { through: 'Cart' });
Order.belongsToMany(Product, { through: LineItem });
Product.belongsToMany(Order, { through: LineItem });
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(User, { through: CartItem });
User.belongsToMany(Product, { through: CartItem });
CartItem.belongsTo(Product);

// export db and models:
module.exports = { db, models: { Order, User, Product, CartItem } };
