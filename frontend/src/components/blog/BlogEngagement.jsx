import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import { addBlogComment, deleteBlogComment, getBlogComments, toggleBlogLike, updateBlogComment } from "../../services/blogService";
import { FiEdit2, FiHeart, FiMessageCircle, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };


    return (
        <div className="border-t border-base-300 pt-10">
            <div className="mb-10 flex items-center gap-4">
                <button
                    onClick={handleLike}
                    className={`btn btn-outline gap-2 ${liked ? "border-error text-error" : ""}`}
                >
                    <FiHeart className={liked ? "fill-current" : ""} />
                    {liked ? "Liked" : "Like"}
                </button>
                <span className="text-sm text-base-content/60">
                    {likesCount}{likesCount === 1 ? "like" : "likes"}
                </span>
            </div>

            <div>
                <div className="mb-6 flex items-center gap-2">
                    <FiMessageCircle className="text-sl" />

                    <h2 className="text-2xl font-bold">
                        Comments ({comments.length})
                    </h2>
                </div>

                {isAuthenticated ? (
                    <form
                        onSubmit={handleAddComment}
                        className="mb-8"
                    >
                        <textarea
                            className="textarea textarea-bordered min-h-28 w-full"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            maxLength={1000}
                            placeholder="Share your thoughts..."
                        />

                        <div className="mt-3 flex justify-between gap-3">
                            <span className="text-xs text-base-content/50">
                                {commentText.length}/1000
                            </span>

                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                                disabled={submitting || !commentText.trim()}
                            >

                                {submitting ? (
                                    <span className="loading loadnig-spinner loading-sm"></span>
                                ) : (
                                    "Post comment"
                                )}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="mb-8 rounded-xl bg-base-200 p-5">
                        <p className="mb-3 text-base-content/70">
                            Log in to join the discussion.
                        </p>
                        <Link
                            to="/login"
                            className="btn btn-primary btn-sm">
                            Log in
                        </Link>
                    </div>
                )}

                {loadingComments ? (
                    <div className="flex justify-center py-10">
                        <span className="loading loading-spinner loading-md text-primary"></span>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="rounded-xl bg-base-200 py-10 text-center">
                        <p className="font-semibold">
                            No comments yet
                        </p>
                        <p className="mt-1 text-sm text-base-content/60">
                            Be the first to share your thoughts.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {comments.map((comment) => {
                            const isOwner =
                                user?._id?.toString() === comment.author?._id?.toString();

                            return (
                                <div
                                    key={comment._id}
                                    className="rounded-xl border border-base-300 p-5"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {comment.author?.avatar ? (
                                                <img
                                                    src={comment.author.avatar}
                                                    alt={comment.author.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                                    {comment.author?.name
                                                        ?.charAt(0)
                                                        .toUpperCase() || "U"}
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-semibold">
                                                    {comment.author?.name || "Unknown user"}
                                                </p>
                                                <p className="text-xs text-base-content/50">
                                                    {formatDate(comment.createdAt)}
                                                </p>
                                            </div>
                                        </div>

                                        {isOwner && editingId !== comment._id && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => startEditing(comment)}
                                                    className="btn btn-ghost btn-xs"
                                                    title="Edit comment"
                                                >
                                                    <FiEdit2 />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="btn btn-ghost btn-xs text-error"
                                                    title="Delete comment"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {editingId === comment._id ? (
                                        <div>
                                            <textarea
                                                className="textarea textarea-bordered w-full"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                maxLength={1000}
                                            />

                                            <div>
                                                <button
                                                    onClick={() => handleUpdateComment(comment._id)}
                                                    className="btn btn-primary btn-xs"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingText("");
                                                    }}
                                                    className="btn btn-ghost btn-xs"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-wrap leading-7 text-base-content/80">
                                            {comment.content}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

        </div>
    );
};

export default BlogEngagement;