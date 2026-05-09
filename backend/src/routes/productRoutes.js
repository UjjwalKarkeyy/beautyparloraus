const express = require("express");
const {
  getProducts,
  getProductById,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/", getProducts);
router.get("/admin/all", adminAuth, getAdminProducts);
router.get("/:id", getProductById);

router.post("/admin", adminAuth, createProduct);
router.patch("/admin/:id", adminAuth, updateProduct);
router.delete("/admin/:id", adminAuth, deleteProduct);

module.exports = router;