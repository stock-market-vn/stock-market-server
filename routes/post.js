const router = require("express").Router()
const { create, readAll, findList, readOne, update, remove } = require("../controllers/postController.js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../controllers/verifyTokenController.js")
const { findCommentByPost } = require("../controllers/commentController")

// GET LIST POSTS
router.post("/comments", findCommentByPost)

// CRETAE POST
router.post("/", verifyToken, create)

// GET ALL POSTS
// router.get("/", readAll)

// GET LIST Comments
router.get("/", findList)

// GET A POST
router.get("/:id", readOne)

// UPDATE A POST
router.put("/:id", verifyToken, update)

// DELETE A POST
router.delete("/:id", verifyToken, remove)


module.exports = router