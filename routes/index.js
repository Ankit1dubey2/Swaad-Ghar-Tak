const express = require("express");
const router = express.Router();

const { checkUser } = require("../middlewares/AuthMiddleware");
const { getIndex } = require("../controllers/indexController");

router.use("*", checkUser);
router.get("/", getIndex);

module.exports = router;
