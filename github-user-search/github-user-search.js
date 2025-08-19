import axios from "axios";

const api = axios.create({
    baseURL: "https://api.github.com",
    // No headers needed since you’re not using a token
});

export const searchUsers = async (username) => {
    const response = await api.get(`/search/users?q=${username}`);
    return response.data;
};

export const getUserDetails = async (username) => {
    const response = await api.get(`/users/${username}`);
    return response.data;
};
