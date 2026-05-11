const express = require("express");
const {
  getServices,
  getServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.get("/admin/all", adminAuth, getAdminServices);
router.post("/admin", adminAuth, createService);
router.patch("/admin/:id", adminAuth, updateService);
router.delete("/admin/:id", adminAuth, deleteService);

router.get("/", getServices);
router.get("/:slug", getServiceBySlug);

module.exports = router;