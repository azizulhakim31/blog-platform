import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getPublicProfile } from "../services/profileService";
import formatBlog from "../utils/formatBlog";

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
        <div>

        </div>
    );
};

export default AuthorProfile;