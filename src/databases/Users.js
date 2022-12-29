const sequelize = require("./initDB");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Users;
