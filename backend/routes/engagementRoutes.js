const express = require("express");

const { toggleLike, getComments, addComment, updateComment, deleteComment } = require("../controllers/engagementController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/blogs/:id/like", protect, toggleLike);

router.get("/blogs/:id/comments", getComments);
router.post("/blogs/:id/comments", protect, addComment);

router.put("/comments/:id", protect, updateComment);
router.delete("/comments/:id", protect, deleteComment);

module.exports = router;