import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
    FiBookOpen,
    FiBookmark,
    FiCamera,
    FiEdit2,
    FiMail,
    FiPenTool,
    FiUser,
} from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AvatarImage from "../components/common/AvatarImage";
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

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <section className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8 lg:p-10">
                    <div className="relative isolate overflow-hidden rounded-2xl border border-primary/10 bg-linear-to-br from-primary/10 via-base-100 to-base-100 p-6 sm:p-8">
                        <div className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-primary/10 blur-3xl" />

                        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                            <div className="avatar shrink-0 self-center sm:self-auto">
                                <div className="size-24 rounded-full bg-primary text-primary-content ring-4 ring-base-100 ring-offset-2 ring-offset-primary/10">
                                    {user?.avatar ? (
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={`${user.name}'s profile`}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <span className="grid h-full place-items-center text-3xl font-bold">
                                            {user?.name?.charAt(0).toUpperCase() || <FiUser />}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="min-w-0 flex-1 text-center sm:text-left">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary sm:text-sm">
                                    Your personal workspace
                                </p>
                                <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                                    Welcome, {user?.name}!
                                </h1>
                                <p className="mt-1 text-sm font-medium text-base-content/60">
                                    @{user?.username}
                                </p>
                                {user?.email && (
                                    <p className="mt-3 flex items-center justify-center gap-2 text-sm text-base-content/65 sm:justify-start">
                                        <FiMail aria-hidden="true" />
                                        <span className="break-all">{user.email}</span>
                                    </p>
                                )}
                                {user?.bio && (
                                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-base-content/75 sm:mx-0">
                                        {user.bio}
                                    </p>
                                )}
                            </div>

                            <label className="btn btn-primary btn-sm shrink-0 self-center sm:self-auto">
                                {uploadingAvatar ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        Uploading
                                    </>
                                ) : (
                                    <>
                                        <FiCamera aria-hidden="true" />
                                        Change picture
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleAvatarUpload}
                                    disabled={uploadingAvatar}
                                    aria-label="Change profile picture"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mt-9">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold tracking-tight">
                                Quick actions
                            </h2>
                            <p className="mt-1 text-sm text-base-content/60">
                                Jump back into your writing and reading.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="card h-full border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                                <div className="card-body p-5">
                                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <FiPenTool className="text-xl" />
                                    </span>
                                    <h3 className="card-title mt-2 text-lg">
                                        Write an article
                                    </h3>
                                    <p className="text-sm leading-6 text-base-content/65">
                                        Share your ideas and experiences.
                                    </p>
                                    <div className="card-actions mt-auto pt-3">
                                        <Link
                                            to="/write"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Start writing
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card h-full border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                                <div className="card-body p-5">
                                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <FiBookmark className="text-xl" />
                                    </span>
                                    <h3 className="card-title mt-2 text-lg">
                                        Bookmarks
                                    </h3>
                                    <p className="text-sm leading-6 text-base-content/65">
                                        Find the stories you want to read again.
                                    </p>
                                    <div className="card-actions mt-auto pt-3">
                                        <Link
                                            to="/bookmarks"
                                            className="btn btn-outline btn-sm"
                                        >
                                            View bookmarks
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card h-full border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                                <div className="card-body p-5">
                                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <FiEdit2 className="text-xl" />
                                    </span>
                                    <h3 className="card-title mt-2 text-lg">
                                        Manage your posts
                                    </h3>
                                    <p className="text-sm leading-6 text-base-content/65">
                                        Edit, review, or delete your articles and drafts.
                                    </p>
                                    <div className="card-actions mt-auto pt-3">
                                        <Link
                                            to="/my-blogs"
                                            className="btn btn-outline btn-sm"
                                        >
                                            Manage posts
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card h-full border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                                <div className="card-body p-5">
                                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                                        <FiBookOpen className="text-xl" />
                                    </span>
                                    <h3 className="card-title mt-2 text-lg">
                                        Explore blogs
                                    </h3>
                                    <p className="text-sm leading-6 text-base-content/65">
                                        Discover articles from other writers.
                                    </p>
                                    <div className="card-actions mt-auto pt-3">
                                        <Link
                                            to="/"
                                            className="btn btn-outline btn-sm"
                                        >
                                            Explore
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/profile"
                                className="card h-full border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                            >
                                <div className="card-body p-5">
                                    <FiUser className="text-3xl text-primary" />

                                    <h2 className="card-title mt-3 text-lg">
                                        My profile
                                    </h2>

                                    <p className="text-sm leading-6 text-base-content/65">
                                        Update your name, bio, and profile picture.
                                    </p>

                                    <div className="card-actions mt-auto pt-3">
                                        <span className="btn btn-outline btn-sm">
                                            Edit profile
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
