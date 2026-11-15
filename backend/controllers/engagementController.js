const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const toggleLike = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            status: "published",
        });

        if (!blog) {
            res.status(404);
            throw new Error("Blog not found");
        }

        const userId = req.user._id.toString();

        const alreadyLiked = blog.likes.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {
            blog.likes.pull(req.user._id);
        } else {
            blog.likes.addToSet(req.user._id);
        }

        await blog.save();

        res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: blog.likes.length,
            message: alreadyLiked
                ? "Like removed"
                : "Blog liked successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getComments = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            status: "published"
        });

        if (!blog) {
            res.status(404);
            throw new Error("Blog not found.");
        }

        const comments = await Comment.find({
            blog: blog._id,
        })
            .populate("author", "name username avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments
        });
    } catch (error) {
        next(error);
    }
};

module.exports={toggleLike, getComments}