const { ensureAuthenticated } = require("../config/auth");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const db = require("../models");

const router = require("express").Router();

router
	.get("/", ensureAuthenticated, async (req, res) => {
		try {
			const colis = [];
			const colies = await db.Colie.findAll({
				raw: true,
				include: ["Colie_type", "Navir"],
			});
			const navirs = await db.Navir.findAll({ raw: true });
			const colie_types = await db.Colie_type.findAll({
				raw: true,
				include: ["Categorie"],
			});
			const categories = await db.Categorie.findAll({ raw: true });
			for (const key in colies) {
				if (Object.hasOwnProperty.call(colies, key)) {
					const colie = colies[key];
					const getColieType = colie_types.filter(
						(ct) => ct.id === colie.colie_type_id,
					);
					colis.push({
						...colie,
						colie_type: getColieType?.[0]?.name,
						fragile: getColieType?.[0]?.fragile ?? false,
						categorie: getColieType?.[0]?.["Categorie.name"],
					});
				}
			}
			return res.render("colie", { colis, navirs, colie_types, categories });
		} catch (error) {
			console.log(error);
			return res.status(500).send("internal server error");
		}
	})

	.post("/add", ValidateField, ensureAuthenticated, async (req, res) => {
		try {
			const { name, navir_id, colie_type_id, qantity } = req.body;
			await db.Colie.create({ name, navir_id, colie_type_id, qantity });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	})

	.post(
		"/edit/:id",
		ValidateField,
		ValidateParams,
		ensureAuthenticated,
		async (req, res) => {
			try {
				const { name, navir_id, colie_type_id, qantity } = req.body;
				const { id } = req.params;
				await db.Colie.update(
					{ name, navir_id, colie_type_id, qantity },
					{ where: { id } },
				);
				return res.redirect(req.headers.referer);
			} catch (error) {
				return res.status(500).send("Internal server error");
			}
		},
	)

	.get("/delete/:id", ValidateParams, ensureAuthenticated, async (req, res) => {
		try {
			const { id } = req.params;
			await db.Colie.destroy({ where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	});

module.exports = router;
