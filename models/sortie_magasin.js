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
      this.belongsTo(models.Colie, {
        foreignKey: "colis_id",
        onDelete:"CASCADE"
      })
      this.belongsTo(models.Magasin, {
        foreignKey: "magasin_id",
        onDelete:"CASCADE"
      })
      this.belongsTo(models.Bon_livraison, {
        foreignKey: "bon_livraison_id",
        onDelete:"CASCADE"
      })
      this.belongsTo(models.Stock, {
        foreignKey: "stock_id",
        onDelete:"CASCADE"
      })
      
    }
  }
  Sortie_magasin.init({
    colis_id: DataTypes.INTEGER,
    magasin_id: DataTypes.INTEGER,
    bon_livraison_id: DataTypes.INTEGER,
    delievery_qty: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    swb: DataTypes.STRING,
    mtn_t: DataTypes.STRING,
    do: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sortie_magasin',
  });
  return Sortie_magasin;
};