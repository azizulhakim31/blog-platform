const express = require("express");

const { uploadBlogCover, uploadAvatar } = require("../controllers/uploadController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
    "/blog-cover",
    protect,
    upload.single("image"),
    uploadBlogCover
);

router.post(
    "/avatar",
    protect,
    upload.single("image"),
    uploadAvatar
);

module.exports = router;