'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale_return extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sale_return.init({
    sortie_magasin_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    motif: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sale_return',
  });
  return Sale_return;
};