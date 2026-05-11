const express = require("express");
const {
  createOrder,
  getAdminOrders,
  updateOrderStatus,
  notifyOrderStatus,
} = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/order", createOrder);

router.get("/orders/admin", adminAuth, getAdminOrders);

router.patch("/orders/admin/:id/status", adminAuth, updateOrderStatus);

router.post("/orders/admin/:id/notify", adminAuth, notifyOrderStatus);

module.exports = router;