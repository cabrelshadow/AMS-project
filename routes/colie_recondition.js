const router = require("express").Router();
const db = require("../models");
const { ValidateField, ValidateParams } = require("../middlewares/validations");
const { ensureAuthenticated } = require("../config/auth");
router.get("/", ensureAuthenticated, async (_, res) => {
	try {
		const Colie_reconditionner = await db.Colis_reconditionner.findAll({
			include: ["Colie"],
			raw: true,
		});
		const colies = await db.Colie.findAll({ raw: true });
		const condition_bags = await db.Condition_bags.findAll({ raw: true });
		return res.render("reconditional_coli", {
			Colie_reconditionner,
			condition_bags,
			colies,
		});
	} catch (error) {
		return res.status(500).send("Internal error");
	}
});

router.post("/add", ensureAuthenticated, ValidateField, async (req, res) => {
	try {
		await db.Colis_reconditionner.create({ ...req.body });
		return res.redirect(req.headers.referer);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal error");
	}
});
router.post(
	"/condition/add",
	ensureAuthenticated,
	ValidateField,
	async (req, res) => {
		try {
			await db.Condition_bags.create({ ...req.body });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal error");
		}
	},
);

router.post(
	"/edit/:id",
	ValidateField,
	ensureAuthenticated,
	ValidateParams,
	async (req, res) => {
		const { id } = req.params;
		try {
			await db.Colie_reconditionner.update({ ...req.body }, { where: { id } });
			return res.redirect(req.headers.referer);
		} catch (error) {
			return res.status(500).send("Internal error");
		}
	},
);
module.exports = router;
