const express = require("express");
const router = express.Router();

const {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  patchUpdate,
} = require("../controllers/userController");

const {
  isAuthenticated,
  checkUser,
  isLogged,
} = require("../middlewares/AuthMiddleware");

router.get("/login", isLogged, getLogin);
router.post("/login", postLogin);
router.get("/register", isLogged, getRegister);
router.post("/register", postRegister);
router.get("/logout", getLogout);
router.patch("/u/:field", isAuthenticated, patchUpdate);

module.exports = router;
