const express = require("express");

const { toggleBookmark, getBookmarks, getBookmarkStatus } = require("../controllers/bookmarkController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getBookmarks);
router.get("/:blogId/status", getBookmarkStatus);
router.post("/:blogId", toggleBookmark);

module.exports = router;