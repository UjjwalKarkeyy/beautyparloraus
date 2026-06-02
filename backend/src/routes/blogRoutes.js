const express = require("express");

const {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/admin/all", adminAuth, getAdminBlogs);
router.post("/admin", adminAuth, createBlog);
router.patch("/admin/:id", adminAuth, updateBlog);
router.delete("/admin/:id", adminAuth, deleteBlog);

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

module.exports = router;