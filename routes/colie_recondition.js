const router = require("express").Router();
const db = require("../models");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
router.get("/", async (_, res) => {
	try {
		const Colie_reconditionner = await db.Colie_reconditionner.findAll({
			include: ["Colie"],
			raw: true,
		});
		const condition_bags = await db.Condition_bags.findAll({ raw: true });
		return res.render("recondition", { Colie_reconditionner, condition_bags });
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/add", ValidateField, async (req, res) => {
	try {
		await db.Colie_reconditionner.create({ ...req.body });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/edit/:id", ValidateField, ValidateParams, async (req, res) => {
	const { id } = req.params;
	try {
		await db.Colie_reconditionner.update({ ...req.body }, { where: { id } });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
module.exports = router;
