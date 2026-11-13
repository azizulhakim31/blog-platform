const formatBlog = (blog) => {
    const content = blog.content || "";

    const wordCount = content.trim()
        ? content.trim().split(/\s+/).length
        : 0;

    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
        id: blog._id,
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,

        author: blog.author?.name || "Unknown author",
        authorUsername: blog.author?.username || "",
        avatar: blog.author?.avatar || "",

        cover:
            blog.coverImage ||
            "https://placehold.co/1200x700?text=BlogSpace",

        date: blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
            : "",

        readTime: `${readTime} min read`,
        content,
        tags: blog.tags || [],
        likes: blog.likes || [],
        status: blog.status,
    };
};

export default formatBlog;
