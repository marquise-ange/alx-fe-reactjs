import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json",
        // Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`, // if you have a token
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
        let query = username ? `${username} in:login` : "";
        if (location) query += ` location:${location}`;
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
                    return user; // fallback if detail fetch fails
                }
            })
        );

        return detailedUsers;
    } catch (error) {
        console.error("Error fetching advanced users:", error);
        return [];
    }
};

import { fetchUserData, fetchAdvancedUsers } from "./githubService";

test("fetchUserData returns user data for a valid username", async () => {
    const data = await fetchUserData("octocat");
    expect(data).toHaveProperty("login", "octocat");
});

test("fetchAdvancedUsers returns an array of users", async () => {
    const data = await fetchAdvancedUsers({ username: "octocat" });
    expect(Array.isArray(data)).toBe(true);
});
