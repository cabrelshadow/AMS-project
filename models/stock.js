'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stock.init({
    colis_id: DataTypes.INTEGER,
    magasin_id: DataTypes.INTEGER,
    torn_leaky_vessel: DataTypes.INTEGER,
    moudly_from_vessel: DataTypes.INTEGER,
    moudly_from_wh: DataTypes.INTEGER,
    torn_leaky_from_wh: DataTypes.INTEGER,
    wet: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    condition_bags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};