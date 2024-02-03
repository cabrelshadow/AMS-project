'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Condition_bags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Stock, {
        foreignKey: "condition_bags_id",
        onDelete:"CASCADE"
      })
    }
  }
  Condition_bags.init({
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Condition_bags',
  });
  return Condition_bags;
};