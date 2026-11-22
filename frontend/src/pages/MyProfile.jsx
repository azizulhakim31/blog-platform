import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { updateMyProfile } from "../services/profileService";
import { uploadAvatar } from "../services/uploadService";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

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
        <>
            <Navbar />

            <main className="mx-auto min-h-[65vh] max-w-3xl px-5 py-12">
                <Link
                    to="/dashboard"
                    className="mb-7 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary"
                >
                    <FiArrowLeft />
                    Back to dashboard
                </Link>

                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                        Account settings
                    </p>
                    <h1 className="text-3xl font-bold">
                        My profile
                    </h1>
                    <p className="mt-2 text-base-content/60">
                        Manage your public identity on Relato.
                    </p>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm md:p-8">
                    <div className="mb-8 flex flex-wrap items-center gap-5">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                                {user?.name?.chatAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        <div>
                            <h2 className="font-bold">
                                Profile picture
                            </h2>
                            <p className="mb-3 text-sm text-base-content/60">
                                Choose a picture that represents you.
                            </p>

                            <label className="btn btn-outline btn-sm">
                                {uploadingAvatar ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Upload picture"
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                    disabled={uploadingAvatar}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <form
                        onSubmit={handleSave}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="profileName"
                                className="label font-semibold"
                            >
                                Display name
                            </label>

                            <input
                                type="text"
                                id="profileName"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                minLength={2}
                                maxLength={50}
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="profileUsername"
                                className="label font-semibold"
                            >
                                Username
                            </label>

                            <input
                                type="text"
                                id="profileusername"
                                className="input input-bordered w-full"
                                value={user?.username || ""}
                                disabled
                            />

                            <p className="mt-1 text-xs text-base-content/50">
                                Your username is permanent and cannot be changed here.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="profileEmail"
                                className="label font-semibold"
                            >
                                Email address
                            </label>

                            <input
                                type="email"
                                id="profileEmail"
                                className="input input-bordered w-full"
                                value={user?.email || ""}
                                disabled
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="profileBio"
                                className="label font-semibold"
                            >
                                About me
                            </label>

                            <textarea
                                id="profileBio"
                                className="textarea textarea-bordered min-h-32 w-full"
                                placeholder="Tell renders a little about yourself..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={300}
                            />

                            <p className="mt-1 text-right text-xs text-base-content/50">
                                {bio.length}/300 characters
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving || uploadingAvatar}
                        >
                            {saving ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <FiSave />
                            )}
                            Save changes
                        </button>
                    </form>

                    <div className="divider"></div>

                    <Link
                        to={`/authors/${user?.username}`}
                        className="link link-primary text-sm"
                    >
                        View my public author profile
                    </Link>

                </div>

            </main>

            <Footer />
        </>
    );
};

export default MyProfile;