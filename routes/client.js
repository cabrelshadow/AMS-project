const { ValidateField, ValidateParams } = require("../middlewares/validations")
const db = require("../models")

const router = require("express").Router()


router.get("/", async (req, res) => {
    const clients = await db.Clients.findAll({ raw: true });
    return res.render("client",{clients})
})

.post("/add",ValidateField, async (req, res) => {
    try {
        const {  name,contact,email,location } = req.body
        await db.Clients.create({ name,contact,email,location });
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

.post("/edit/:id",ValidateField, ValidateParams, async (req, res) => {
    try {
        const { name,contact,email,location } = req.body
        const {id} = req.params
        await db.Clients.update({ name,contact,email,location },{where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

.get("/delete/:id", ValidateParams, async (req, res) => {
    try {
        const {id} = req.params
        await db.clients.destroy({where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})


module.exports = router