const router = require("express").Router();
const { create, remove, findAll, findById } = require("../controllers/categoryController.js");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../controllers/verifyTokenController.js");

// CRETAE CATEGORY
router.post("/", verifyTokenAndAdmin, create);

// FIND ALL CATEGORIES
router.get("/", findAll);

// FIND CATEGORY BY ID
router.get("/:id", findById);

// DELETE CATEGORY
router.delete("/:id", verifyTokenAndAdmin, remove);

module.exports = router;
