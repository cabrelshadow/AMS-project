const { ValidateField, ValidateParams } = require("../middlewares/validations")
const db = require("../models")

const router = require("express").Router()


router.get("/", async (req, res) => {
    const colis = await db.Colie.findAll({ raw: true, include: ["Colie_type", "Categorie"] });
    const navirs = await db.Navir.findAll({ raw: true });
    const categories = await db.Categorie.findAll({raw:true})
    return res.render("colis",{colis,navirs,categories})
})

.post("/add",ValidateField, async (req, res) => {
    try {
        const { name, navir_id,colie_type_id,quantity } = req.body
        await db.Colie.create({ name, navir_id,colie_type_id,quantity });
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

.post("/edit/:id",ValidateField, ValidateParams, async (req, res) => {
    try {
        const { name, navir_id,colie_type_id,quantity } = req.body
        const {id} = req.params
        await db.Colie.update({ name, navir_id,colie_type_id,quantity },{where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

.get("/delete/:id", ValidateParams, async (req, res) => {
    try {
        const {id} = req.params
        await db.Colie.destroy({where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})


module.exports = router