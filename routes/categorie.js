const { ensureAuthenticated } = require("../config/auth");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const db = require("../models");
const router = require("express").Router();

router
	.get("/", ensureAuthenticated, async (req, res) => {
		try {
			const categories = await db.Categorie.findAll({ raw: true });
			return res.render("categorie", { categories });
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	})
	.post("/add", ensureAuthenticated, ValidateField, async (req, res) => {
		try {
			const { name } = req.body;
			await db.Categorie.create({ name });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	})

	.post(
		"/edit/:id",
		ensureAuthenticated,
		ValidateField,
		ValidateParams,
		async (req, res) => {
			try {
				const { name } = req.body;
				const { id } = req.params;
				await db.Categorie.update({ name }, { where: { id } });
				return res.redirect(req.headers.referer);
			} catch (error) {
				return res.status(500).send("Internal server error");
			}
		},
	)

	.get("/delete/:id", ensureAuthenticated, ValidateParams, async (req, res) => {
		try {
			const { id } = req.params;
			await db.Categorie.destroy({ where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	});

module.exports = router;
