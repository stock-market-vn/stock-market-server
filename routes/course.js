const router = require("express").Router()
const { create, readAll, readOne, update, remove, join, unJoin } = require("../controllers/courseController.js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../controllers/verifyTokenController.js")

// CRETAE COURSE
router.post("/", verifyTokenAndAdmin, create)

// GET ALL COURSE
router.get("/", readAll)

// GET A COURSE
router.get("/:id", readOne)

// UPDATE A COURSE
router.put("/:id", verifyTokenAndAdmin, update)

// DELETE A COURSE
router.delete("/:id", verifyTokenAndAdmin, remove)

// JOIN a COURSE
router.post("/join", verifyToken, join)

// UNJOIN a COURSE
router.post("/unjoin", verifyToken, unJoin)
module.exports = router