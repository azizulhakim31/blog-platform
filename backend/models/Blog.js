const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
            maxlength: 150,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        excerpt: {
            type: String,
            required: true,
            maxlength: 300,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        coverImage: {
            type: String,
            default: "",
        },

        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "published",
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);