const router = require("express").Router()
const { readAll } = require("../controllers/stockTodayController.js")

router.get("/", readAll)

module.exports = router