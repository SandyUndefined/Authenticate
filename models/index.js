const Sequelize = require("sequelize");
const config = require("../config/config").production;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, Sequelize);
db.contacts = require("./contact")(sequelize, Sequelize);

// Associations
db.users.hasMany(db.contacts, { as: "contacts", foreignKey: "userId" });
db.contacts.belongsTo(db.users, { as: "user", foreignKey: "userId" });

module.exports = db;
