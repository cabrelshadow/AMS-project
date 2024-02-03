'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Navir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Colie, {
        foreignKey: "navir_id",
        onDelete:"CASCADE"
      })
    }
  }
  Navir.init({
    name: DataTypes.STRING,
    weight: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Navir',
  });
  return Navir;
};