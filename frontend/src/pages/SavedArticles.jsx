import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getBookmarks } from "../services/bookmarkService";
import formatBlog from "../utils/formatBlog";

const SavedArticles = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const data = await getBookmarks();

                setBlogs((data.blogs || []).map(formatBlog));
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Unable to load saved articles."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, []);
    return (
        <div>

        </div>
    );
};

export default SavedArticles;