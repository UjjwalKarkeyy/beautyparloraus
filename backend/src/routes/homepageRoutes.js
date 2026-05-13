const express = require("express");

const {
  getHomepageStats,
  getAdminHomepageStats,
  createHomepageStat,
  updateHomepageStat,
  deleteHomepageStat,
} = require("../controllers/homepageController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/stats/admin/all", adminAuth, getAdminHomepageStats);
router.post("/stats/admin", adminAuth, createHomepageStat);
router.patch("/stats/admin/:id", adminAuth, updateHomepageStat);
router.delete("/stats/admin/:id", adminAuth, deleteHomepageStat);

router.get("/stats", getHomepageStats);

module.exports = router;