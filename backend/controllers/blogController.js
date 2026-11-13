const Blog = require("../models/Blog");

const createSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const generateUniqueSlug = async (title, excludeId = null) => {
    const baseSlug = createSlug(title) || "blog";

    let slug = baseSlug;
    let counter = 1;

    while (
        await Blog.findOne({
            slug,
            ...(excludeId && { _id: { $ne: excludeId } }),
        })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};


const createBlog = async (req, res, next) => {
    try {
        const {
            title,
            excerpt,
            content,
            category,
            coverImage,
            tags,
            status
        } = req.body;

        if (!title || !excerpt || !content || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, excerpt, content and category",
            });
        }

        const validStatus = ["draft", "published"];

        if (status && !validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog status",
            });
        }

        const slug = await generateUniqueSlug(title);

        const blog = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            category,
            coverImage,
            tags: Array.isArray(tags) ? tags : [],
            status: status || "published",
            author: req.user._id,
        });

        const createdBlog = await Blog.findById(blog._id).populate(
            "author",
            "name username avatar"
        );

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: createdBlog,
        });
    } catch (error) {
        next(error);
    }
};

const getBlogs = async (req, res, next) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        const currentPage = Math.max(1, Number(page) || 1);
        const perPage = Math.min(50, Math.max(1, Number(limit) || 10));

        const filter = {
            status: "published",
        };

        if (category && category !== "All") {
            filter.category = category;
        }

        if (search) {
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filter.$or = [
                { title: { $regex: safeSearch, $options: "i" } },
                { excerpt: { $regex: safeSearch, $options: "i" } },
                { tags: { $regex: safeSearch, $options: "i" } },
            ];
        }

        const totalBlogs = await Blog.countDocuments(filter);

        const blogs = await Blog.find(filter)
            .populate("author", "name username avatar")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * perPage)
            .limit(perPage);

        res.status(200).json({
            success: true,
            count: blogs.length,
            totalBlogs,
            currentPage,
            totalPages: Math.ceil(totalBlogs / perPage),
            blogs,
        });
    } catch (error) {
        next(error);
    }
};


const getMyBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({
            author: req.user._id,
        })
            .populate("author", "name username avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs,
        });
    } catch (error) {
        next(error);
    }
};


const getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({
            slug: req.params.slug,
            status: "published",
        }).populate("author", "name username avatar");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            blog,
        });
    } catch (error) {
        next(error);
    }
};


const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this blog",
            });
        }

        const {
            title,
            excerpt,
            content,
            category,
            coverImage,
            tags,
            status
        } = req.body;

        if (status && !["draft", "published"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog status",
            });
        }

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Title cannot be empty",
                });
            }

            blog.title = title.trim();
            blog.slug = await generateUniqueSlug(title, blog._id);
        }

        if (excerpt !== undefined) blog.excerpt = excerpt;
        if (content !== undefined) blog.content = content;
        if (category !== undefined) blog.category = category;
        if (coverImage !== undefined) blog.coverImage = coverImage;
        if (tags !== undefined) {
            if (!Array.isArray(tags)) {
                return res.status(400).json({
                    success: false,
                    message: "Tags must be an array",
                });
            }

            blog.tags = tags;
        }
        if (status !== undefined) blog.status = status;

        await blog.save();

        const updatedBlog = await Blog.findById(blog._id).populate(
            "author",
            "name username avatar"
        );

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        next(error);
    }
};


const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this blog",
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createBlog, getBlogs, getMyBlogs, getBlogBySlug, updateBlog, deleteBlog };