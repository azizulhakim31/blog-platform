import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BlogEditor from "../components/blog/BlogEditor";
import { createBlog } from "../services/blogService";

const WriteBlog = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (blogData) => {
        try {
            setSubmitting(true);

            const data = await createBlog(blogData);

            toast.success(
                blogData.status === "draft"
                    ? "Draft saved successfully!"
                    : "Blog published successfully!"
            );

            if (data.blog.status === "published") {
                navigate(`/blogs/${data.blog.slug}`);
            } else {
                navigate("/my-blogs");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to create your blog post."
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
                    to="/dashboard"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary"
                >
                    <FiArrowLeft />
                    Back to dashboard
                </Link>

                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                        Your writing space
                    </p>

                    <h1 className="text-3xl font-bold md:text-4xl">
                        Write a story
                    </h1>

                    <p className="mt-2 text-base-content/60">
                        Share your thoughts and ideas with the BlogSpace community.
                    </p>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm md:p-8">
                    <BlogEditor
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                </div>
            </main>

            <Footer />
        </>
    );
};

export default WriteBlog;