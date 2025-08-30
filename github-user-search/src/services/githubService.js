import axios from "axios";

// Create axios instance with token from .env
const api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    },
});

// Basic user fetch by username
export const fetchUserData = async (username) => {
    if (!username) return null;

    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

// Advanced search with filters: username, location, minRepos
export const fetchAdvancedUsers = async ({ username, location, minRepos }) => {
    try {
        let query = username ? `${username.trim()} in:login` : "";
        if (location) query += ` location:${location.trim()}`;
        if (minRepos) query += ` repos:>=${minRepos}`;

        if (!query) return [];

        const response = await api.get("/search/users", { params: { q: query } });
        const users = response.data.items || [];

        // Fetch full details for each user
        const detailedUsers = await Promise.all(
            users.map(async (user) => {
                try {
                    const res = await api.get(user.url);
                    return res.data;
                } catch {
                    return user;
                }
            })
        );

        return detailedUsers;
    } catch (error) {
        console.error("Error fetching advanced users:", error);
        return [];
    }
};
