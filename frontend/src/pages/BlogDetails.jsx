import { Link, useParams } from "react-router-dom";
import { blogs } from "../data/blogs";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "../components/common/Footer";

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
        <div>

        </div>
    );
};

export default BlogDetails;