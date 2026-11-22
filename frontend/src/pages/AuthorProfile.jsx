import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiFileText } from "react-icons/fi";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { getPublicProfile } from "../services/profileService";
import formatBlog from "../utils/formatBlog";
import BlogCard from "../components/blog/BlogCard";

const AuthorProfile = () => {
    const { username } = useParams();

    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPublicProfile(username);

                setAuthor(data.user);
                setBlogs((data.blogs || []).map(formatBlog));
            } catch (err) {
                setError(
                    err.response?.data?.message || "Unable to load this author profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

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

    if (error || !author) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
                    <h1 className="mb-3 text-3xl font-bold">
                        Author not found
                    </h1>

                    <p className="mb-6 text-base-content/60">
                        {error || "This profile is unavailable."}
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

    const memberSince = new Date(author.createdAt).toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    );

    return (
        <>
            <Navbar />

            <main className="mx-auto min-h-[65vh] max-w-6xl px-5 py-12">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary"
                >
                    <FiArrowLeft />
                    Back to homepage
                </Link>

                <section className="mb-14 rounded-2xl border border-base-300 bg-base-100 p-6 md:p-10">
                    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                        {author.avatar ? (
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="h-28 w-28 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
                                {author.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="flex-1">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                                Author profile
                            </p>
                            <h1 className="text-3xl font-bold md:text-4xl">
                                {author.name}
                            </h1>
                            <p className="mt-1 text-base-content/50">
                                @{author.username}
                            </p>
                            {author.bio && (
                                <p className="mt-4 max-w-2xl leading-7 text-base-content/70">
                                    {author.bio}
                                </p>
                            )}
                            <p className="mt-4 text-sm text-base-content/50">
                                Member since {memberSince}
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Stories by {author.name}
                            </h2>
                            <p className="mt-1 text-sm text-base-content/60">
                                Articles published by this author
                            </p>
                        </div>

                        <span className="badge badge-outline gap-1 px-3 py-3">
                            <FiFileText />
                            {blogs.length} {blogs.length === 1 ? "article" : "articles"}
                        </span>
                    </div>

                    {blogs.length === 0 ? (
                        <div className="rounded-2xl border border-base-300 py-16 text-center">
                            <h3 className="mb-2 text-xl font-bold">
                                No published stories yet
                            </h3>
                            <p className="text-base-content/60">
                                This author hasn't published any articles
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
};

export default AuthorProfile;