const router = require("express").Router();
const { register, login, getprofile, logout, updateProfile, deleteProfile, getAllusers } = require("../controllers/userController");
const { userAuth } = require("../middlewares/userMiddleware");
const { upload } = require("../middlewares/upload")

router.post("/register", register)
router.post("/login", login)
router.get("/getprofile", userAuth, getprofile)
router.get("/logout", logout)
router.patch("/updateprofile", userAuth, upload.single("profileImage"), updateProfile)
router.delete("/deleteprofile", userAuth, deleteProfile)
router.get("/getallusers", getAllusers)

module.exports = router 