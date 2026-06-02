const express = require("express");
const {
  loginAdmin,
  getAdminProfile,
} = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/me", adminAuth, getAdminProfile);

module.exports = router;