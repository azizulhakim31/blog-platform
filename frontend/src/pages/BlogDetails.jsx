import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import toast from "react-hot-toast";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { getBlogBySlug } from "../services/blogService";
import formatBlog from "../utils/formatBlog";

const BlogDetails = () => {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getBlogBySlug(slug);
                setBlog(formatBlog(data.blog));
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load this article."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Article link copied!");
        } catch {
            toast.error("Unable to copy the article link.");
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !blog) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
                    <h2 className="mb-3 text-3xl font-bold">
                        Article not found
                    </h2>

                    <p className="mb-6 text-base-content/60">
                        {error || "This article may have been removed or is unavailable."}
                    </p>

                    <Link to="/" className="btn btn-primary">
                        <FiArrowLeft />
                        Back to homepage
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    const paragraphs = blog.content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    return (
        <>
            <Navbar />

            <main className="mx-auto max-w-4xl px-5 py-12">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary"
                >
                    <FiArrowLeft />
                    Back to articles
                </Link>

                {/* Article Header */}
                <header className="mb-8">
                    <span className="badge badge-primary mb-5">
                        {blog.category}
                    </span>

                    <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
                        {blog.title}
                    </h1>

                    <p className="mb-7 text-lg text-base-content/60">
                        {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-y border-base-300 py-5">
                        <div className="flex items-center gap-3">
                            {blog.avatar ? (
                                <img
                                    src={blog.avatar}
                                    alt={blog.author}
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                    {blog.author.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <div>
                                <p className="font-semibold">{blog.author}</p>
                                <p className="text-sm text-base-content/50">
                                    {blog.date} · {blog.readTime}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleShare}
                            className="btn btn-outline btn-sm"
                        >
                            <FiShare2 />
                            Share
                        </button>
                    </div>
                </header>

                {/* Cover Image */}
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="mb-10 max-h-125 w-full rounded-2xl object-cover"
                />

                {/* Article Content */}
                <article className="mb-12">
                    {paragraphs.length > 0 ? (
                        <div className="space-y-6 text-lg leading-8 text-base-content/80">
                            {paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-base-content/60">
                            No article content is available.
                        </p>
                    )}
                </article>

                {/* Tags */}
                {blog.tags.length > 0 && (
                    <div className="mb-10 border-t border-base-300 pt-6">
                        <h3 className="mb-3 font-semibold">Tags</h3>

                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={`${tag}-${index}`}
                                    className="badge badge-outline"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Author Information */}
                <div className="rounded-2xl bg-base-200 p-6">
                    <h3 className="mb-2 text-lg font-bold">
                        About the author
                    </h3>

                    <p className="font-semibold">{blog.author}</p>

                    {blog.authorUsername && (
                        <p className="text-sm text-base-content/60">
                            @{blog.authorUsername}
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default BlogDetails;