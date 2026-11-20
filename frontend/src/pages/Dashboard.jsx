import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiBookOpen, FiEdit2, FiMail, FiPenTool, FiUser, FiBookmark } from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { uploadAvatar } from "../services/uploadService";

const Dashboard = () => {
    const { user, updateUser } = useAuth();
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

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

            toast.success("Profile image updated!");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update profile image."
            );
        } finally {
            setUploadingAvatar(false);
            e.target.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-base-100 p-6 shadow-sm sm:p-10">
                    <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-linear-to-br from-primary/10 via-base-100 to-base-100 p-6 sm:p-8">
                        <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />

                        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="avatar">
                                <div className="size-20 rounded-full bg-primary text-primary-content ring-4 ring-base-100 ring-offset-2 ring-offset-primary/10">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={`${user.name}'s profile`}
                                        />
                                    ) : (
                                        <span className="grid h-full place-items-center text-3xl font-bold">
                                            {user?.name?.charAt(0).toUpperCase() || <FiUser />}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                                    Your personal workspace
                                </p>
                                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                                    Welcome, {user?.name}!
                                </h2>
                                <p className="mt-1 font-medium text-base-content/60">
                                    @{user?.username}
                                </p>
                                {user?.email && (
                                    <p className="mt-3 flex items-center gap-2 text-sm text-base-content/65">
                                        <FiMail aria-hidden="true" />
                                        {user.email}
                                    </p>
                                )}
                                {user?.bio && (
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-base-content/75">
                                        {user.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-10 flex flex-wrap items-center gap-5 rounded-2xl border border-base-300 p-5">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div>
                            <h2 className="font-bold">Profile picture</h2>

                            <p className="mb-3 text-sm text-base-content/60">
                                Upload a photo for your Relato profile.
                            </p>

                            <label className="btn btn-outline btn-sm">
                                {uploadingAvatar ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Change picture"
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

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiPenTool className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">
                                    Write an article
                                </h2>
                                <p className="text-sm text-base-content/65">
                                    Share your ideas and experiences.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link
                                        to="/write"
                                        className="btn btn-primary btn-sm"
                                    >
                                        Start writing
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiBookmark className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">
                                    Bookmarks
                                </h2>
                                <p className="text-sm text-base-content/65">
                                    Find the stories you want to read again.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link
                                        to="/bookmarks"
                                        className="btn btn-outline btn-sm"
                                    >
                                        View bookmarks
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiEdit2 className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">
                                    Manage your posts
                                </h2>
                                <p className="text-sm text-base-content/65">
                                    Edit, review, or delete your articles and drafts.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link
                                        to="/my-blogs"
                                        className="btn btn-outline btn-sm"
                                    >
                                        Manage posts
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300 bg-base-100">
                            <div className="card-body">
                                <FiBookOpen className="text-2xl text-primary" />
                                <h2 className="card-title mt-3">
                                    Explore blogs
                                </h2>
                                <p className="text-sm text-base-content/65">
                                    Discover articles from other writers.
                                </p>
                                <div className="card-actions mt-4">
                                    <Link
                                        to="/"
                                        className="btn btn-outline btn-sm"
                                    >
                                        Explore
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
