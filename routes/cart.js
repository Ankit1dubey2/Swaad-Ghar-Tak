const express = require("express");
const router = express.Router();

const {
  getCart,
  getCount,
  postCart,
  patchCart,
  deleteCart,
  clearCart,
} = require("../controllers/cartController");
const { isAuthenticated } = require("../middlewares/AuthMiddleware");
router.get("/", isAuthenticated, getCart);
router.get("/count", isAuthenticated, getCount);
router.post("/:id", isAuthenticated, postCart);
router.patch("/:id", isAuthenticated, patchCart);
router.delete("/:id", isAuthenticated, deleteCart);
router.delete("/clear/all", isAuthenticated, clearCart);
module.exports = router;
