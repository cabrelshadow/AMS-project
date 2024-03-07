const { ValidateField, ValidateParams } = require("../middlewares/validations")
const db = require("../models")

const router = require("express").Router()


router.get("/", async (req, res) => {
    const navirs = await db.Navir.findAll({ raw: true });
    return res.render("navir",{navirs})
})

.post("/add",ValidateField, async (req, res) => {
    
    try {
        const { name, weight } = req.body
        const getnavir = await db.Navir.findOne({ where: { name } });
        if (getnavir ) {
            req.session.messages.push({
                type: "danger",
                msg: "ce navir existe deja",
            });
            return res.redirect(req.headers.referer);
        }
        
        await db.Navir.create({ name, weight });
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
})

.post("/edit/:id",ValidateField, ValidateParams, async (req, res) => {
    try {
        const { name, weight } = req.body
        const {id} = req.params
        await db.Navir.update({ name, weight },{where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})

.get("/delete/:id", ValidateParams, async (req, res) => {
    try {
        const {id} = req.params
        await db.Navir.destroy({where:{id}});
        return res.redirect(req.headers.referer)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
})


module.exports = router