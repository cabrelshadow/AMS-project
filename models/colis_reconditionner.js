'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colis_reconditionner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Colie, {
        foreignKey: "colie_id",
        onDelete:"CASCADE"
      })
    }
  }
  Colis_reconditionner.init({
    colie_id: DataTypes.INTEGER,
    condition_bag_id: DataTypes.INTEGER,
    repackaged: DataTypes.INTEGER,
    loss: DataTypes.INTEGER,
    sweepy: DataTypes.INTEGER,
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Colis_reconditionner',
  });
  return Colis_reconditionner;
};