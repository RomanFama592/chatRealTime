const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("accounts", "username", null, {
  dialect: "sqlite",
  storage: path.join(__dirname, "accounts.sqlite"),
});


module.exports = sequelize;
