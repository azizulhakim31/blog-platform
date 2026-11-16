import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { addBlogComment, getBlogComments, toggleBlogLike } from "../../services/blogService";
import toast from "react-hot-toast";

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

    const handleLike = async () => {
        if (!isAuthenticated) {
            toast.error("Please log in to like this article.");
            return;
        }

        try {
            const data = await toggleBlogLike(blogId);

            setLiked(data.liked);
            setLikesCount(data.likesCount);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to update like."
            );
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) {
            toast.error("Please write a comment first.");
            return;
        }

        try {
            setSubmitting(true);

            const data = await addBlogComment(blogId, commentText);

            setComments((previous) => [
                data.comment,
                ...previous
            ]);

            setCommentText("");
            toast.success("Comment added succesfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to add comment."
            );
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div>

        </div>
    );
};

export default BlogEngagement;