const express = require("express");

const { getMyProfile, updateMyProfile, getPublicProfile } = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);

router.get("/:username", getPublicProfile);

module.exports = router;