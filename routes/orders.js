const express = require("express");
const router = express.Router();

const {
  getOrders,
  postOrder,
  getOrderView,
} = require("../controllers/orderController");

const { isAuthenticated } = require("../middlewares/AuthMiddleware");

router.get("/:id", isAuthenticated, getOrderView);
router.get("/", isAuthenticated, getOrders);
router.post("/new", isAuthenticated, postOrder);

module.exports = router;
