const User = require("../models/User");
const Blog = require("../models/Blog");

const toggleBookmark = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findOne({
            _id: blogId,
            status: "published",
        });

        if (!blog) {
            res.status(404);
            throw new Error("Published article not found");
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        const alreadyBookmarked = (user.bookmarks || []).some(
            (id) => id.toString() === blogId
        );

        if (alreadyBookmarked) {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { bookmarks: blog._id },
            });

            return res.status(200).json({
                success: true,
                bookmarked: false,
                message: "Article removed from saved articles",
            });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { bookmarks: blog._id },
        });

        return res.status(200).json({
            success: true,
            bookmarked: true,
            message: "Article saved successfully",
        });
    } catch (error) {
        next(error);
    }
};


const getBookmarks = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "bookmarks",
            match: { status: "published" },
            populate: {
                path: "author",
                select: "name, username, avatar"
            }
        });

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        const blogs = (user.bookmarks || []).filter(Boolean);

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { toggleBookmark, getBookmarks };
