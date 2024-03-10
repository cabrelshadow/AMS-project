const { ensureAuthenticated } = require("../config/auth");
const db = require("../models");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
	const count_navir = await db.Navir.count();
	const count_magasin = await db.Magasin.count();
	const count_colie = await db.Colie.count();
	const count_client = await db.Clients.count();
	return res.render("index", {
		count_navir,
		count_client,
		count_colie,
		count_magasin,
	});
});

module.exports = router;
