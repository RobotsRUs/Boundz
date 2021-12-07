const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const SALT_ROUNDS = 5;

// model definition:
const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: Sequelize.STRING,
    validate: {
      is: /^(1-)?\d{3}-\d{3}-\d{4}$/,
    },
  },
  address1: {
    type: Sequelize.STRING,
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      len: [5, 5],
    },
  },
  userType: {
    type: Sequelize.ENUM('Customer', 'Administrator', 'Engineer'),
    allowNull: false,
    defaultValue: 'Customer',
  },
});

// instance methods:

User.prototype.isCorrectPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

// class methods:

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.isCorrectPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      const error = Error('Invalid user');
      error.status = 401;
      throw error;
    }
    return user;
  } catch (err) {
    const error = Error('Bad token');
    error.status = 401;
    throw error;
  }
};

// hooks:

const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = User;
