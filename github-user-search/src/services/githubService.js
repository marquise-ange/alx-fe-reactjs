import axios from "axios";

// Function to fetch user data from GitHub API
export const fetchUserData = async (username) => {
    if (!username) throw new Error("Username is required");

    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data; // return user data to component
};

import axios from "axios";

// Function for advanced search
export const fetchAdvancedUsers = async ({ username, location, minRepos }) => {
    let query = "";

    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`);
    const users = response.data.items;

    // Fetch additional details for each user (optional)
    const detailedUsers = await Promise.all(
        users.map(async (user) => {
            const res = await axios.get(`https://api.github.com/users/${user.login}`);
            return res.data;
        })
    );

    return detailedUsers;
};
