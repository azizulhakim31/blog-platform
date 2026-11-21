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

module.exports = { getMyProfile };