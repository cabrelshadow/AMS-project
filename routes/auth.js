const router = require("express").Router();
const passport = require("passport");
module.exports = router;

router.get("/login", (_req, res) => {
	return res.render("auth/login", { layout: false });
});
router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		successRedirect: req.query.next ? req.query.next : "/",
		// failureFlash: true,
	})(req, res, next);
});

router.get("/logout", (_req, res) => {
	return _req.logout(() => {
		res.redirect("/auth/login");
	});
});
