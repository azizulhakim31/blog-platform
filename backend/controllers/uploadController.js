const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const uploadToCloudinary = (file, folder, uploadOptions = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: `relato/${folder}`,
                resource_type: "image",
                ...uploadOptions,
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

const getCloudinaryPublicId = (url) => {
    const cloudName = cloudinary.config().cloud_name;
    const uploadPath = `https://res.cloudinary.com/${cloudName}/image/upload/`;

    if (!cloudName || !url?.startsWith(uploadPath)) {
        return null;
    }

    const pathSegments = url.slice(uploadPath.length).split("/");
    const versionIndex = pathSegments.findIndex((segment) => /^v\d+$/.test(segment));

    if (versionIndex === -1) {
        return null;
    }

    const publicId = pathSegments.slice(versionIndex + 1).join("/");
    const normalizedPublicId = publicId.replace(/\.[^/.]+$/, "");

    return normalizedPublicId.startsWith("relato/profile-avatars/")
        ? normalizedPublicId
        : null;
};

const uploadBlogCover = async (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400);
            throw new Error("Please select an image");
        }

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

        const previousAvatar = req.user.avatar;
        const result = await uploadToCloudinary(req.file, "profile-avatars", {
            public_id: `avatar-${req.user._id}`,
            overwrite: true,
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: result.secure_url },
            { new: true, runValidators: true }
        ).select("name username email avatar bio");

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        const previousPublicId = getCloudinaryPublicId(previousAvatar);
        if (previousPublicId && previousPublicId !== result.public_id) {
            try {
                const deletion = await cloudinary.uploader.destroy(previousPublicId, {
                    resource_type: "image",
                });

                if (deletion.result !== "ok" && deletion.result !== "not found") {
                    console.warn("Unable to remove the previous avatar asset.");
                }
            } catch (error) {
                console.warn("Unable to remove the previous avatar asset:", error.message);
            }
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