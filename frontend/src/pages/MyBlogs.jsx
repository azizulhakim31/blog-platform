import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { deleteBlog, getMyBlogs } from "../services/blogService";

import formatBlog from "../utils/formatBlog";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMyBlogs();
            setBlogs((data.blogs || []).map(formatBlog));
        } catch (err) {
            setError(
                err.response?.data?.message || "Unable to load your posts."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this blog post?"
        );

        if (!confirmed) return;

        try {
            await deleteBlog(id);

            setBlogs((previous) =>
                previous.filter((blog) => blog.id !== id));
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Unable to delete this blog."
            );
        }
    };
    return (
        <>
            <Navbar />

            <main className="mx-auto min-h-[65vh] max-w-6xl px-5 py-12">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                            Your Writing
                        </p>
                        <h1 className="text-3xl font-bold">
                            My stories
                        </h1>
                        <p className="mt-2 text-base-content/60">
                            Manage your published articles and drafts.
                        </p>
                    </div>

                    <Link
                        to="/write"
                        className="btn btn-primary"
                    >
                        <FiPlus /> Write a story
                    </Link>
                </div>

                {loading && (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl bg-error/10 p-6 text-center">
                        <p className="mb-4 text-error">{error}</p>
                        <button
                            onClick={fetchBlogs}
                            className="btn btn-primary btn-sm">
                            Try again
                        </button>
                    </div>
                )}

                {!loading && !error && blogs.length === 0 && (
                    <div className="rounded-2xl border border-base-300 py-20 text-center">
                        <h2 className="mb-2 text-xl font-bold">
                            You haven't written anything yet
                        </h2>

                        <p className="mb-6 text-base-content/60">
                            Start writing and share your first story
                        </p>

                        <Link
                            to="/write"
                            className="btn btn-primary"
                        >
                            <FiPlus /> Create your first post
                        </Link>
                    </div>
                )}

                {!loading && !error && blogs.length > 0 && (
                    <div className="space-y-4">
                        {blogs.map((blog) =>
                            <div
                                key={blog.id}
                                className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row"
                            >
                                <img
                                    src={blog.cover}
                                    alt={blog.title}
                                    className="h-40 w-full rounded-xl object-cover sm:w-52"
                                />

                                <div className="flex flex-1 flex-col justify-between gap-4">
                                    <div>
                                        <div className="mb-3 flex flex-wrap items-cener gap-2">
                                            <span className="badge badge-outline">
                                                {blog.category}
                                            </span>
                                            <span
                                                className={`badge ${blog.status === "published"
                                                    ? "badge-success" : "badge-warning"
                                                    }`}>
                                                {blog.status}
                                            </span>
                                        </div>

                                        <h2 className="mb-2 text-xl font-bold">
                                            {blog.title}
                                        </h2>
                                        <p className="line-clamp-2 text-sm text-base-content/60">
                                            {blog.excerpt}
                                        </p>
                                        <p className="mt-3 text-xs text-base-content/60">
                                            {blog.date}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            to={`/blogs/${blog.id}`}
                                            className="btn btn-sm btn-outline"
                                        >
                                            <FiEdit2 /> Edit
                                        </Link>

                                        {blog.status === "published" && (
                                            <Link
                                                to={`/blogs/${blog.slug}`}
                                                className="btn btn-sm btn-outline"
                                            >
                                                <FiEye /> View
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="btn btn-sm btn-error btn-outline"
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                )}

            </main>

            <Footer />
        </>
    );
};

export default MyBlogs;