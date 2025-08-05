import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  const handleSearchChange = (e) => {
    try {
      setSearchTerm(e.target.value);
    } catch (error) {
      console.error('Error updating search term:', error);
    }
  };

  const handleClearSearch = () => {
    try {
      setSearchTerm('');
    } catch (error) {
      console.error('Error clearing search term:', error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title, description, or ingredients..."
        value={searchTerm || ''}
        onChange={handleSearchChange}
        className="search-input"
      />
      {searchTerm && (
        <button 
          onClick={handleClearSearch}
          className="clear-search-btn"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar; 