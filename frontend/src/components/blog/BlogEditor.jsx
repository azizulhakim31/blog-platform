import { useEffect, useState } from "react";
import { FiSave, FiSend } from "react-icons/fi";
import { uploadBlogCover } from "../../services/uploadService";

const initialForm = {
    title: "",
    excerpt: "",
    content: "",
    category: "Technology",
    coverImage: "",
    tags: "",
    status: "published",
};

const categories = [
    "Technology",
    "Design",
    "Lifestyle",
    "Productivity",
    "Travel",
];

const BlogEditor = ({
    initialData,
    onSubmit,
    submitting,
    isEditing = false,
}) => {
    const [form, setForm] = useState(initialForm);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                excerpt: initialData.excerpt || "",
                content: initialData.content || "",
                category: initialData.category || "Technology",
                coverImage: initialData.coverImage || "",
                tags: Array.isArray(initialData.tags)
                    ? initialData.tags.join(", ")
                    : "",
                status: initialData.status || "published",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleCoverUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be 5 MB or less.");
            e.target.value = "";
            return;
        }

        try {
            setUploadingImage(true);

            const data = await uploadBlogCover(file);

            setForm((previous) => ({
                ...previous,
                coverImage: data.imageUrl,
            }));
        } catch (error) {
            alert(
                error.response?.data?.message || "Image upload failed. Please try again."
            );
        } finally {
            setUploadingImage(false);
            e.target.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            ...form,
            tags: form.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        };

        onSubmit(blogData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
                <label className="label font-semibold" htmlFor="title">
                    Blog title
                </label>

                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Give your story a title..."
                    className="input input-bordered w-full"
                    value={form.title}
                    onChange={handleChange}
                    maxLength={150}
                    required
                />
            </div>

            {/* Excerpt */}
            <div>
                <label className="label font-semibold" htmlFor="excerpt">
                    Short description
                </label>

                <textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Write a short introduction to your article..."
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    value={form.excerpt}
                    onChange={handleChange}
                    maxLength={300}
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label className="label font-semibold" htmlFor="category">
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    className="select select-bordered w-full"
                    value={form.category}
                    onChange={handleChange}
                    required
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Cover Image */}
            <div>
                <label className="label font-semibold">
                    Blog cover image
                </label>

                <input
                    type="file"
                    accept="image/"
                    className="file-input file-input-bordered w-full"
                    onChange={handleCoverUpload}
                    disabled={uploadingImage}
                />

                <p className="mt-2 text-xs text-base-content/50">
                    Choose an Image from your device. Maximum size: 5 MB.
                </p>

                {uploadingImage && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                        <span className="loading loading-spinner loading-sm">
                            Uploading image...
                        </span>
                    </div>
                )}

                {form.coverImage && (
                    <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold">
                            Cover preview
                        </p>

                        <img
                            src={form.coverImage}
                            alt="Blog cover preview"
                            className="max-h-64 w-full rounded-xl object-cover"
                        />

                        <button
                            type="button"
                            className="btn btn-ghost btn-xs mt-2 text-error"
                            onClick={() =>
                                setForm((previous) => ({
                                    ...previous,
                                    coverImage: ""
                                }))
                            }
                        >
                            Remove image
                        </button>
                    </div>
                )}
            </div>

            {/* Tags */}
            <div>
                <label className="label font-semibold" htmlFor="tags">
                    Tags
                </label>

                <input
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="React, JavaScript, Web Development"
                    className="input input-bordered w-full"
                    value={form.tags}
                    onChange={handleChange}
                />

                <p className="mt-1 text-xs text-base-content/50">
                    Separate tags with commas.
                </p>
            </div>

            {/* Content */}
            <div>
                <label className="label font-semibold" htmlFor="content">
                    Article content
                </label>

                <textarea
                    id="content"
                    name="content"
                    placeholder="Start writing your story..."
                    className="textarea textarea-bordered min-h-87.5 w-full leading-7"
                    rows={15}
                    value={form.content}
                    onChange={handleChange}
                    required
                />

                <p className="mt-1 text-xs text-base-content/50">
                    Separate paragraphs with blank lines.
                </p>
            </div>

            {/* Status */}
            <div>
                <label className="label font-semibold" htmlFor="status">
                    Publication status
                </label>

                <select
                    id="status"
                    name="status"
                    className="select select-bordered w-full"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="published">Publish now</option>
                    <option value="draft">Save as draft</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 border-t border-base-300 pt-5">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting || uploadingImage}
                >
                    {submitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : form.status === "draft" ? (
                        <FiSave />
                    ) : (
                        <FiSend />
                    )}

                    {isEditing ? "Save changes" : "Create post"}
                </button>
            </div>
        </form>
    );
};

export default BlogEditor;