const { ensureAuthenticated } = require("../config/auth");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const colie_type = await db.Colie_type.findAll({ raw: true });
	return res.render("navir", { colie_type });
});

router
	.post("/add", ValidateField, ensureAuthenticated, async (req, res) => {
		try {
			const { name, fragile, category_id } = req.body;
			await db.Colie_type.create({ name, fragile, category_id });
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
				const { name, fragile, categorie_id } = req.body;
				const { id } = req.params;
				await db.Colie_type.update(
					{ name, fragile, categorie_id },
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
			await db.Colie_type.destroy({ where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	});

module.exports = router;
