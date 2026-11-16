import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBlogComments } from "../../services/blogService";

const BlogEngagement = ({ blogId, initialLikes = [] }) => {
    const { user, isAuthenticated } = useAuth();

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes.length);

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const [loadingComments, setLoadingComments] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        const userId = user?._id;

        const hasLiked = initialLikes.some((like) => {
            const likeId = like?._id || like;
            return likeId?.toString() === userId?.toString();
        });

        setLiked(Boolean(userId && hasLiked));
        setLikesCount(initialLikes.length);
    }, [initialLikes, user]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoadingComments(true);

                const data = await getBlogComments(blogId);
                setComments(data.comments || []);
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Unable to load comments."
                );
            } finally {
                setLoadingComments(false);
            }
        };
        fetchComments();
    }, [blogId]);
    return (
        <div>

        </div>
    );
};

export default BlogEngagement;