import api from "./api";

export const getBookmarks = async () => {
    const { data } = await api.get("/bookmarks");
    return data;
};

export const getBookmarkStatus = async (blogId) => {
    const { data } = await api.get(`/bookmarks/${blogId}/status`);
    return data;
};

export const toggleBookmark = async (blogId) => {
    const { data } = await api.post(`/bookmarks/${blogId}`);
    return data;
};