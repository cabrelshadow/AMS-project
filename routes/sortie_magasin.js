const router = require("express").Router();
const db = require("../models");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
router.get("/", async (_, res) => {
	try {
		const sorties = await db.Sortie_magasin.findAll({
			include: ["Colie", "Magasin", "Stock"],
			raw: true,
		});
		return res.render("sortie_magasin", { sorties });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/add", ValidateField, async (req, res) => {
	try {
		await db.Sortie_magasin.create({ ...req.body });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/edit/:id", ValidateField, ValidateParams, async (req, res) => {
	const { id } = req.params;
	try {
		await db.Sortie_magasin.update({ ...req.body }, { where: { id } });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
module.exports = router;
