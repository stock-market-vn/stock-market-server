const router = require("express").Router();
const { readMe, readAll, readOne, updateUser, updatePassword, remove, checkEmail, checkVerifyCode, addNewUser, updateIsAdmin } = require("../controllers/userController.js")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../controllers/verifyTokenController.js")

// GET ME
router.get("/me", verifyToken, readMe);

// GET ALL USER
router.get("/", readAll);

// GET A USER BY ID
router.get("/:id", readOne);

// UPDATE A USER BY ID
router.put("/updateProfile", verifyToken, updateUser);

// UPDATE A USER BY ID
router.put("/updatePassword", verifyToken, updatePassword);

// DELET A USER
router.delete("/:id", verifyTokenAndAuthorization, remove);

// add new user
router.post("/addNewUser", verifyTokenAndAuthorization, addNewUser);

// update isAdmin
router.put("/updateIsAdmin", verifyTokenAndAuthorization, updateIsAdmin);

// CHECK EMAIL
router.post("/email", checkEmail);

// CHECK VERIFY CODE
router.get("/email/verify", checkVerifyCode);

module.exports = router
