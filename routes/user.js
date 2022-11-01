const router = require("express").Router();
const { readMe, readAll, readOne, updateUser, updatePassword, remove } = require("../controllers/userController.js")
const { unFollow, follow } = require("../controllers/followController.js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../controllers/verifyTokenController.js")

// GET ME
router.get("/me", verifyToken, readMe);

// GET ALL USER
router.get("/", readAll);

// GET A USER BY ID
router.get("/:id", readOne);

// UPDATE A USER BY ID
router.put("/profile", verifyToken, updateUser);

// UPDATE A USER BY ID
router.put("/updatePassword", verifyToken, updatePassword);

// DELET A USER
router.delete("/:id", verifyTokenAndAuthorization, remove);

// FOLLOW USER
router.post("/follow-user", verifyToken, follow);

// UNFOLLOW USER
router.post("/unfollow-user", verifyToken, unFollow);

module.exports = router