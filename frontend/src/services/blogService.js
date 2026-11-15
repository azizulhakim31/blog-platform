import api from "./api";

// public
export const getBlogs = async (params = {}) => {
    const { data } = await api.get("/blogs", { params });
    return data;
};

export const getBlogBySlug = async (slug) => {
    const { data } = await api.get(`/blogs/${slug}`);
    return data;
};

// protected
export const getMyBlogs = async () => {
    const { data } = await api.get("/blogs/my-blogs");
    return data;
};

export const createBlog = async (blogData) => {
    const { data } = await api.post("/blogs", blogData);
    return data;
};

export const updateBlog = async (id, blogData) => {
    const { data } = await api.put(`/blogs/${id}`, blogData);
    return data;
};

export const deleteBlog = async (id) => {
    const { data } = await api.delete(`/blogs/${id}`);
    return data;
};

export const toggleBlogLike = async (blogId) => {
    const { data } = await api.post(`/blogs/${blogId}/like`);
    return data;
};

export const getBlogComment = async (blogId) => {
    const { data } = await api.get(`/blogs/${blogId}/comments`);
    return data;
};

export const addBlogComment = async (blogId, content) => {
    const { data } = await api.post(`/blogs/${blogId}/comments`, {
        content
    });
    return data;
};

export const updateBlogComment = async (commentId, content) => {
    const { data } = await api.put(`/comments/${commentId}`, {
        content
    });
    return data;
};

export const deleteBlogComment = async (commentId) => {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
};