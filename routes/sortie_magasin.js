const router = require("express").Router();
const db = require("../models");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const { ensureAuthenticated } = require("../config/auth");
router.get("/", ensureAuthenticated, async (_, res) => {
	try {
		const sorties = await db.Sortie_magasin.findAll({
			include: ["Colie", "Magasin", "Stock"],
			raw: true,
		});
		const colies = await db.Colie.findAll({ raw: true });
		const magasins = await db.Magasin.findAll({ raw: true });
		const stocks = await db.Stock.findAll({ raw: true });
		return res.render("sortie_magasin", { sorties, colies, magasins, stocks });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/add", ensureAuthenticated, ValidateField, async (req, res) => {
	try {
		await db.Sortie_magasin.create({ ...req.body });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post(
	"/edit/:id",
	ensureAuthenticated,
	ValidateField,
	ValidateParams,
	async (req, res) => {
		const { id } = req.params;
		try {
			await db.Sortie_magasin.update({ ...req.body }, { where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal error");
		}
	},
);
module.exports = router;
