import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BlogEditor from "../components/blog/BlogEditor";

import { getMyBlogs, updateBlog } from "../services/blogService";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getMyBlogs();

                const selectedBlog = (data.blogs || []).find(
                    (item) => item._id === id
                );

                if (!selectedBlog) {
                    setError("Blog not found in your posts.");
                    return;
                }

                setBlog(selectedBlog);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load your blog."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleSubmit = async (blogData) => {
        try {
            setSubmitting(true);

            const data = await updateBlog(id, blogData);

            toast.success("Blog updated successfully!");

            if (data.blog.status === "published") {
                navigate(`/blogs/${data.blog.slug}`);
            } else {
                navigate("/my-blogs");
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Unable to update your blog."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="mx-auto max-w-4xl px-5 py-12">
                <Link
                    to="/my-blogs"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary"
                >
                    <FiArrowLeft />
                    Back to my posts
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        Edit your story
                    </h1>

                    <p className="mt-2 text-base-content/60">
                        Update your article and save your changes.
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                {!loading && error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                {!loading && blog && (
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm md:p-8">
                        <BlogEditor
                            initialData={blog}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            isEditing
                        />
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
};

export default EditBlog;