'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sortie_magasin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sortie_magasin.init({
    colis_id: DataTypes.INTEGER,
    magasin_id: DataTypes.INTEGER,
    bon_livraison_id: DataTypes.INTEGER,
    delievery_qty: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    swb: DataTypes.STRING,
    mtn - t: DataTypes.STRING,
    do: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sortie_magasin',
  });
  return Sortie_magasin;
};