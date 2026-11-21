const User = require("../models/User");
const Blog = require("../models/Blog");

const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select(
            "name username email avatar bio createdAt"
        );

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

const updateMyProfile = async (req, res, next) => {
    try {
        const { name, bio } = req.body;

        if (name !== undefined && name.trim().length < 2) {
            res.status(400);
            throw new Error("Name must contain at least 2 characters");
        }

        if (name !== undefined && name.trim().length > 50) {
            res.status(400);
            throw new Error("Name cannot exceed 50 characters");
        }


        if (bio !== undefined && bio.length > 300) {
            res.status(400);
            throw new Error("Bio cannot exceed 300 characters");
        }

        const updates = {};

        if (name !== undefined) {
            updates.name = name.trim();
        }

        if (bio !== undefined) {
            updates.bio = bio.trim();
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ).select("name username email avatar bio createdAt");

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { getMyProfile, updateMyProfile };