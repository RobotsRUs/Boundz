const db = require('./db');

// require models:
const ModelTemplate = require('./models/Model_Template');
const User = require('./models/User');

// associate models:

// export db and models:
module.exports = { db, models: { ModelTemplate, User } };
