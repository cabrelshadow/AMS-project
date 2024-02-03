"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Bon_livraison extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Clients, {
				foreign_key: "client_id",
				onDelete: "CASCADE",
			});
			this.belongsTo(models.Colie, {
				foreignKey: "colis_id",
				onDelete:"CASCADE"
			})
			this.hasMany(models.Sortie_magasin, {
				foreignKey: "bon_livraison_id",
				onDelete:"CASCADE"
			})
		}
	}
	Bon_livraison.init(
		{
			code: DataTypes.STRING,
			qty: DataTypes.INTEGER,
			truck_number: DataTypes.STRING,
			colis_id:DataTypes.INTEGER,
			destination: DataTypes.STRING,
			client_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Bon_livraison",
		},
	);
	return Bon_livraison;
};
