const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const uploadToCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `relato/${folder}`,
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(file.buffer);
    });
};

const uploadBlogCover = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error("Please select an image");
        }

        const result = await uploadToCloudinary(req.file, "blog-covers");
        const result = await uploadToCloudinary(req.file, "blog-covers");

        res.status(200).json({
            success: true,
            message: "Blog cover uploaded successfully",
            imageUrl: result.secure_url,
            publicId: result.public_id
        });
    } catch (error) {
        next(error);
    }
};

const uploadAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error("Please select an image");
        }

        const result = await uploadToCloudinary(req.file, "profile-avatars");

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: result.secure_url },
            { new: true, runValidators: true }
        ).select("name username email avatar bio");

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            user
        });
    } catch (error) {
        next(error)
    }
};

module.exports = { uploadBlogCover, uploadAvatar };