const express = require("express");

const {
  getReviews,
  getFeaturedReviews,
  getAdminReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/admin/all", adminAuth, getAdminReviews);
router.post("/admin", adminAuth, createReview);
router.patch("/admin/:id", adminAuth, updateReview);
router.delete("/admin/:id", adminAuth, deleteReview);

router.get("/featured", getFeaturedReviews);
router.get("/", getReviews);

module.exports = router;