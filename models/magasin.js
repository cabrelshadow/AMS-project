'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Magasin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sale_return, {
        foreignKey: "sortie_magasin_id",
        onDelete:"CASCADE"
      })
      this.hasMany(models.Sortie_magasin, {
        foreignKey: "magasin_id",
        onDelete:"CASCADE"
      })
      this.hasOne(models.Stock, {
        foreignKey: "magasin_id",
        onDelete:"CASCADE"
      })
    }
  }
  Magasin.init({
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Magasin',
  });
  return Magasin;
};