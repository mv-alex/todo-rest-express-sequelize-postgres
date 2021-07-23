const { DataTypes, Model } = require("sequelize");

const sequelize = require("../config/db");

class Todo extends Model {}

Todo.init(
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
  }
);

console.log("The table for the Todo model was just (re)created!");

module.exports = Todo;
