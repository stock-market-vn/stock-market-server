const router = require("express").Router()
const { readAll, readOne, findStockToday, findOneYear } = require("../controllers/stockController.js")

router.get("/", readAll)

router.get("/today", findStockToday)

router.get("/one-year", findOneYear)

router.get("/:id", readOne)

module.exports = router