import api from "./api";

export const uploadBlogCover = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await api.post(
        "/uploads/blog-cover",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};


export const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await api.post(
        "/uploads/avatar",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};