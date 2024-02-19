"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Colie extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Navir, {
				foreignKey: "navir_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.Colie_type, {
				foreignKey: "colie_type_id",
				onDelete: "CASCADE",
			});
			this.hasMany(models.Colis_reconditionner, {
				foreignKey: "colis_id",
				onDelete: "CASCADE",
			});
			this.hasMany(models.Bon_livraison, {
				foreignKey: "colis_id",
				onDelete: "CASCADE",
			});
			this.hasMany(models.Sortie_magasin, {
				foreignKey: "colis_id",
				onDelete: "CASCADE",
			});
			this.hasOne(models.Stock, {
				foreignKey: "colis_id",
				onDelete: "CASCADE",
			});
		}
	}
	Colie.init(
		{
			name: DataTypes.STRING,
			navir_id: DataTypes.INTEGER,
			colie_type_id: DataTypes.INTEGER,
			qantity: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Colie",
		},
	);
	return Colie;
};
