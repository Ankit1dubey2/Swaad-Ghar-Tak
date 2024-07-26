const express = require("express");
const router = express.Router();

const { getMenu, getSearch } = require("../controllers/menuController");
const { isAuthenticated } = require("../middlewares/AuthMiddleware");

router.get("/", isAuthenticated, getMenu);
router.get("/search", isAuthenticated, getSearch);

module.exports = router;
