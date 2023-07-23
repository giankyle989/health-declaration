const router = require("express").Router();
const {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/userController.js");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
