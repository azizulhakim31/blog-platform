const express = require("express");

const { createBlog, getBlogs, getMyBlogs, getBlogBySlug, updateBlog, deleteBlog } = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBlogs);
router.get("/my-blogs", protect, getMyBlogs);
router.get("/:slug", getBlogBySlug);

router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;