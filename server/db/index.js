const db = require('./db');

// require models:
const Order = require('./models/Order');
const User = require('./models/User');
const Product = require('./models/Product');
const LineItem = require('./models/LineItem');

// associate models:
Order.belongsToMany(Product, { through: LineItem });
Product.belongsToMany(Order, { through: LineItem });
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
User.hasMany(Order);
Order.belongsTo(User);

// export db and models:
module.exports = { db, models: { Order, User, Product, LineItem } };
