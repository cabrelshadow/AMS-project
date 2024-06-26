const { ensureAuthenticated } = require("../config/auth");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const db = require("../models");

const router = require("express").Router();

router
	.get("/", ensureAuthenticated, async (req, res) => {
		const navirs = await db.Navir.findAll({ raw: true });
		return res.render("navir", { navirs });
	})

	.post("/add", ensureAuthenticated, ValidateField, async (req, res) => {
		try {
			const { name, weight } = req.body;
			const getnavir = await db.Navir.findOne({ where: { name } });
			if (getnavir) {
				req.session.messages.push({
					type: "danger",
					msg: "ce navir existe deja",
				});
				return res.redirect(req.headers.referer);
			}else{
				req.session.messages.push({
					type: "success",
					msg: "navire creer avec success",
				});
				
			}

			await db.Navir.create({ name, weight });
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
				const { name, weight } = req.body;
				const { id } = req.params;
				await db.Navir.update({ name, weight }, { where: { id } });
				return res.redirect(req.headers.referer);
			} catch (error) {
				return res.status(500).send("Internal server error");
			}
		},
	)

	.get("/delete/:id", ValidateParams, ensureAuthenticated, async (req, res) => {
		try {
			const { id } = req.params;
			await db.Navir.destroy({ where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	});

module.exports = router;
