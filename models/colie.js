'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Colie.init({
    name: DataTypes.STRING,
    navire_id: DataTypes.INTEGER,
    colie_type_id: DataTypes.INTEGER,
    qantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Colie',
  });
  return Colie;
};