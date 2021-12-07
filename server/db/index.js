const db = require('./db');

// require models:
const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');
const LineItem = require('./models/LineItem');

// associate models:
User.belongsToMany(Product, { through: 'Cart' });
Product.belongsToMany(User, { through: 'Cart' });
Order.belongsToMany(Product, { through: LineItem });
Product.belongsToMany(Order, { through: LineItem });
User.belongsToMany(Order, { through: 'User_Order' });
Order.belongsToMany(User, { through: 'User_Order' });

// export db and models:
module.exports = { db, models: { Order, User, Product } };
