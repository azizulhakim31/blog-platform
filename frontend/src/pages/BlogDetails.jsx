import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiClock } from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { blogs } from "../data/blogs";

const BlogDetails = () => {
    const { slug } = useParams();
    const blog = blogs.find((item) => item.slug === slug);

    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    if (!blog) {
        return (
            <div className="min-h-screen bg-base-100">
                <Navbar />
                <main className="mx-auto max-w-3xl px-4 py-24 text-center">
                    <h1 className="text-4xl font-extrabold">
                        Article not found
                    </h1>
                    <p className="mt-4 text-base-content/70">
                        This article may have been removed or does not exist.
                    </p>
                    <Link
                        to="/"
                        className="btn btn-primary mt-8"
                    >
                        <FiArrowLeft /> Back to home
                    </Link>
                </main>
                <Footer />
            </div>
        );
    };

    const relatedBlogs = blogs.filter((item) => item.slug !== blog.slug && item.category === blog.category).slice(0, 3);

    const handleShare = async () => {
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url
                })
            }
            else {
                await navigator.clipboard.writeText(url);
                alert("Article link copied!");
            }
        }
        catch (error) {
            if (error.name !== "AbortError") {
                alert("Unable to share this article.")
            }
        }
    };

    return (
        <div className="min-h-screen bg-base-100 text-base-content">
            <Navbar />

            <main>
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    <Link
                        to="/"
                        className="btn btn-ghost btn-sm gap-2"
                    >
                        <FiArrowLeft />Back to stories
                    </Link>
                </div>

                {/* Article heading */}
                <header className="mx-auto max-w-4xl px-4 pb-10 pt-8 text-center sm:px-6 lg:px-8 lg:pt-12">
                    <span className="badge badge-primary badge-outline px-4 py-3">
                        {blog.category}
                    </span>
                    <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {blog.title}
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-base-content/70">
                        {blog.excerpt}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <img
                            src={blog.avatar}
                            alt={blog.author}
                            className="size-12 rounded-full object-cover"
                        />

                        <div className="text-left">
                            <p className="font-semibold">
                                {blog.author}
                            </p>
                            <p className="text-sm text-base-content/60">
                                {blog.date}
                            </p>
                        </div>

                        <span className="hidden h-8 w-px bg-base-300 sm:block" />
                        <span className="flex items-center gap-2 text-sm text-base-content/65">
                            <FiClock />{blog.readTime}
                        </span>
                    </div>
                </header>

                {/* Cover image */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <img
                        src={blog.cover}
                        alt={blog.title}
                        className="max-h-140 w-full rounded-3xl object-cover"
                    />
                </div>
            </main>
        </div>
    );
};

export default BlogDetails;