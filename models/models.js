const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const MeetUp = sequelize.define("meetUp", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: false },
  keywords: { type: DataTypes.STRING },
  eventInformation: { type: DataTypes.STRING, allowNull: false },
});
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

User.hasMany(MeetUp);
MeetUp.belongsTo(User);

module.exports = {
  MeetUp,
  User,
};
