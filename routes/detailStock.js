const router = require("express").Router()
const { readAll, readOne } = require("../controllers/detailStockController.js")

router.get("/", readAll)

router.get("/:id", readOne)

module.exports = router