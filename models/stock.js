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
      this.hasMany(models.Sortie_magasin, {
        foreignKey: "stock_id",
        onDelete:"CASCADE"
      })
      this.belongsTo(models.Colie, {
        foreignKey: "colis_id",
        onDelete:"CASCADE"
      })
      this.belongsTo(models.Magasin, {
        foreignKey: "magasin_id",
        onDelete:"CASCADE"
      })
      this.belongsTo(models.Condition_bags, {
        foreignKey: "condition_bags_id",
        onDelete:"CASCADE"
      })
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
    condition_bags_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};