import api from "./api";

export const getMyProfile = async () => {
    const { data } = await api.get("/users/me");
    return data;
}

export const updateMyProfile = async (profileData) => {
    const { data } = await api.put("/users/me", profileData);
    return data;
}

export const getPublicProfile = async (username) => {
    const { data } = await api.get(`/users/${username}`);
    return data;
}