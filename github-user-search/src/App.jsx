import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (!query) return; // prevent empty search
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${query}`);
      setUsers(res.data.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>GitHub User Search</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          placeholder="Search GitHub users..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button
          onClick={handleSearch}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
        >
          Search
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width={50}
              style={{ marginRight: '1rem', borderRadius: '50%' }}
            />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
