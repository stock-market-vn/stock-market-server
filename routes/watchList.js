const router = require("express").Router()
const { create, findByMe, remove } = require("../controllers/watchListController.js")
const { verifyToken } = require("../controllers/verifyTokenController.js")

router.post("/", verifyToken, create)

router.get("/me", verifyToken, findByMe)

router.delete("/:watchListId", verifyToken, remove)

module.exports = router