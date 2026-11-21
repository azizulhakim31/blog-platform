import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { updateMyProfile } from "../services/profileService";
import { uploadAvatar } from "../services/uploadService";

const MyProfile = () => {
    const { user, updateUser } = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");

    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    useEffect(() => {
        setName(user?.name || "");
        setBio(user?.bio || "");
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();

        if (name.trim().length < 2) {
            toast.error("Name must contain at least 2 characters.");
            return;
        }

        try {
            setSaving(true);

            const data = await updateMyProfile({
                name: name.trim(),
                bio: bio.trim()
            });

            updateUser(data.user);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to update your profile."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be 5 MB or less.");
            e.target.value = "";
            return;
        }

        try {
            setUploadingAvatar(true);

            const data = await uploadAvatar(file);

            updateUser(data.user);
            toast.success("Profile picture updated!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to upload profile picture."
            );
        } finally {
            setUploadingAvatar(false);
            e.target.value = "";
        }
    };

    return (
        <div>

        </div>
    );
};

export default MyProfile;