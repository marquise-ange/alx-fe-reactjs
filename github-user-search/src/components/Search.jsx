import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
    // --- STATE: used for rendering ---
    const [username, setUsername] = useState("");   // user input
    const [userData, setUserData] = useState(null); // fetched data
    const [loading, setLoading] = useState(false);  // loading state
    const [error, setError] = useState("");         // error message

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setUserData(null);

        try {
            const data = await fetchUserData(username); // call service
            setUserData(data);
        } catch (err) {
            setError("Looks like we can't find the user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* form to input username */}
            <form onSubmit={handleSearch}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                />
                <button type="submit">Search</button>
            </form>

            {/* conditional rendering */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {userData && (
                <div>
                    <img src={userData.avatar_url} alt={userData.login} />
                    <p>{userData.name || userData.login}</p>
                    <a href={userData.html_url}>View Profile</a>
                </div>
            )}
        </div>
    );
}










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
            setUsers(data);
        } catch (err) {
            setError("No users found with these criteria");
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
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {users.length > 0 && (
                <ul className="mt-4 space-y-3">
                    {users.map((user) => (
                        <li key={user.id} className="border p-3 rounded flex items-center gap-3">
                            <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold">{user.login}</p>
                                <p>Location: {user.location || "N/A"}</p>
                                <p>Repos: {user.public_repos}</p>
                                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
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
