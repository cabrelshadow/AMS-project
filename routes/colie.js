const { ValidateField, ValidateParams } = require("../middlewares/validations")
const db = require("../models")

const router = require("express").Router()


router.get("/", async (req, res) => {
    try {
        const colis = await db.Colie.findAll({ raw: true, include: ["Colie_type","Navir"] });
        const navirs = await db.Navir.findAll({ raw: true });
        const colie_types = await db.Colie_type.findAll({ raw: true })
        const categories = await db.Categorie.findAll({ raw: true })
        return res.render("colie", { colis, navirs, colie_types,categories })
        
    } catch (error) {
    
        return res.status(500).send("internal server error")
    }
})

.post("/add",ValidateField, async (req, res) => {
    try {
        const { name, navir_id,colie_type_id,qantity } = req.body
        await db.Colie.create({ name, navir_id,colie_type_id,qantity });
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

.post("/edit/:id",ValidateField, ValidateParams, async (req, res) => {
    try {
        const { name, navir_id,colie_type_id,qantity } = req.body
        const {id} = req.params
        await db.Colie.update({ name, navir_id,colie_type_id,qantity },{where:{id}});
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