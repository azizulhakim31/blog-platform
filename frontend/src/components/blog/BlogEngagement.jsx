import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import { addBlogComment, deleteBlogComment, getBlogComments, toggleBlogLike, updateBlogComment } from "../../services/blogService";

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

    const startEditing = (comment) => {
        setEditingId(comment._id);
        setEditingText(comment.content);
    };

    const handleUpdateComment = async (commentId) => {
        if (!editingText.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        try {
            const data = await updateBlogComment(
                commentId,
                editingText
            );

            setComments((previous) =>
                previous.map((comment) =>
                    comment._id === commentId ? data.comment : comment
                )
            );

            setEditingId(null);
            setEditingText("");

            toast.success("Comment updated!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to update comment."
            );
        }
    };

    const handleDeleteComment = async (commentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmed) return;

        try {
            await deleteBlogComment(commentId);

            setComments((previous) =>
                previous.filter((comment) => comment._id !== commentId)
            );

            toast.success("Comment deleted!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to delete comment."
            );
        }
    };

    return (
        <div>

        </div>
    );
};

export default BlogEngagement;