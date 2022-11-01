const router = require("express").Router();
const {
  create,
  readAll,
  readOne,
  update,
  remove,
} = require("../controllers/commentController.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyTokenController.js");

// CRETAE COMMENT
router.post("/", verifyToken, create);

// GET ALL COMMENT
router.get("/", readAll);

// GET A COMMENT
router.get("/:id", readOne);

// UPDATE A COMMENT
router.put("/:id", verifyToken, update);

// DELETE A COMMENT
router.delete("/:id", verifyToken, remove);

module.exports = router;
