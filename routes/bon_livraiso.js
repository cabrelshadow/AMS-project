const { ensureAuthenticated } = require("../config/auth");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const db = require("../models");

const router = require("express").Router();

router
	.get("/", ensureAuthenticated, async (req, res) => {
		const bon_livraison = await db.Bon_livraison.findAll({ raw: true });
		return res.render("bon_livraison", { bon_livraison });
	})

	.post("/add", ensureAuthenticated, ValidateField, async (req, res) => {
		try {
			const { name, weight } = req.body;
			const getnavir = await db.Bon_livraison.findOne({ where: { code } });
			if (getBon) {
				req.session.messages.push({
					type: "danger",
					msg: "ce bon de livraison existe deja",
				});
				return res.redirect(req.headers.referer);
			}else{
				req.session.messages.push({
					type: "success",
					msg: "bon de livraison creer avec success",
				});
				
			}

			await db.Bon_livraison.create({ code, qty,truck_number,destination });
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
				const { code, qty,truck_number,destination  } = req.body;
				const { id } = req.params;
				await db.Bon_livraison.update({ code, qty,truck_number,destination }, { where: { id } });
				return res.redirect(req.headers.referer);
			} catch (error) {
				return res.status(500).send("Internal server error");
			}
		},
	)

	.get("/delete/:id", ValidateParams, ensureAuthenticated, async (req, res) => {
		try {
			const { id } = req.params;
			await db.Bon_livraison.destroy({ where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal server error");
		}
	});

module.exports = router;
