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
    const { data } = await api.get("/blogs/my-blog");
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