const express = require("express");
const {
  createOrder,
  getAdminOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/order", createOrder);

router.get("/orders/admin", adminAuth, getAdminOrders);

router.patch("/orders/admin/:id/status", adminAuth, updateOrderStatus);

module.exports = router;