
import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

function Search() {
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [minRepos, setMinRepos] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setUsers([]);

        try {
            const data = await fetchAdvancedUsers({ username, location, minRepos });
            if (data.length === 0) {
                setError("Looks like we can't find the user");
            } else {
                setUsers(data);
            }
        } catch {
            setError("Looks like we can't find the user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="grid gap-3">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Minimum Repositories"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {users.length > 0 && (
                <ul className="mt-4 space-y-3">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="border p-3 rounded flex items-center gap-3"
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="font-bold">{user.login}</p>
                                <p>Location: {user.location || "N/A"}</p>
                                <p>Repos: {user.public_repos}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600"
                                >
                                    View Profile
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
