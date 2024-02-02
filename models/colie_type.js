"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Colie_type extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Categorie, {
				foreignKey: "category_id",
				onDelete:"CASCADE"
			})
		}
	}
	Colie_type.init(
		{
			name: DataTypes.STRING,
			fagile: DataTypes.BOOLEAN,
			category_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Colie_type",
		},
	);
	return Colie_type;
};
