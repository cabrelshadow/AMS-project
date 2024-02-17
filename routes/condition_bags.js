const router = require("express").Router();
const db = require("../models");
const { ValidateField, ValidateParams } = require("../middlewares/validations");

router.post("/add", ValidateField, async (req, res) => {
	try {
		await db.Condition_bags.create({ ...req.body });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/edit/:id", ValidateField, ValidateParams, async (req, res) => {
	const { id } = req.params;
	try {
		await db.Condition_bags.update({ ...req.body }, { where: { id } });
		return res.redirect(req.headers.referer);
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});
module.exports = router;
