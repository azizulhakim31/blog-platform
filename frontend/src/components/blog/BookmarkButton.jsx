import { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import { getBookmarkStatus, toggleBookmark } from "../../services/bookmarkService";

const BookmarkButton = ({ blogId, className = "" }) => {
    const { isAuthenticated } = useAuth();

    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;

        const checkStatus = async () => {
            if (!isAuthenticated || !blogId) {
                setBookmarked(false);
                return;
            }

            try {
                const data = await getBookmarkStatus(blogId);

                if (active) {
                    setBookmarked(data.bookmarked);
                }
            } catch {
                if (active) {
                    setBookmarked(false);
                }
            }
        };

        checkStatus();

        return () => {
            active = false;
        };
    }, [blogId, isAuthenticated]);

    const handleToggle = async () => {
        if (!isAuthenticated) {
            toast.error("Please log in to save articles.");
            return;
        }

        try {
            setLoading(true);

            const data = await toggleBookmark(blogId);

            setBookmarked(data.bookmarked);

            toast.success(data.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to update bookmark."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={loading}
            aria-label={bookmarked ? "Remove saved article" : "Save article"}
            aria-pressed={bookmarked}
            className={`btn btn-outline btn-sm gap-2 ${className}`}
        >

            {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
            ) : (
                <FiBookmark
                    className={bookmarked ? "fill-current text-primary" : ""}
                />
            )}

            {bookmarked ? "Saved" : "Save for later"}

        </button>
    );
};

export default BookmarkButton;