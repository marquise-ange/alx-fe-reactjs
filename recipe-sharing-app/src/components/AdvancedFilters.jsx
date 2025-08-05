import React, { useState } from 'react';
import useRecipeStore from './recipeStore';

const AdvancedFilters = () => {
  const filters = useRecipeStore(state => state.filters);
  const setFilter = useRecipeStore(state => state.setFilter);
  const clearFilters = useRecipeStore(state => state.clearFilters);

  const [showFilters, setShowFilters] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');

  const handleIngredientAdd = () => {
    try {
      if (newIngredient.trim() && !filters.hasIngredients.includes(newIngredient.trim())) {
        setFilter('hasIngredients', [...filters.hasIngredients, newIngredient.trim()]);
        setNewIngredient('');
      }
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleIngredientRemove = (ingredientToRemove) => {
    try {
      setFilter('hasIngredients', filters.hasIngredients.filter(ingredient => ingredient !== ingredientToRemove));
    } catch (error) {
      console.error('Error removing ingredient:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleIngredientAdd();
    }
  };

  const handleFilterChange = (filterType, value) => {
    try {
      setFilter(filterType, value);
    } catch (error) {
      console.error('Error setting filter:', error);
    }
  };

  const handleClearFilters = () => {
    try {
      clearFilters();
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  return (
    <div className="advanced-filters">
      <button 
        className="toggle-filters-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
      </button>
      
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-section">
            <h4>Category</h4>
            <select 
              value={filters.category || ''} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div className="filter-section">
            <h4>Difficulty</h4>
            <select 
              value={filters.difficulty || ''} 
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="filter-select"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="filter-section">
            <h4>Maximum Preparation Time (minutes)</h4>
            <input
              type="number"
              value={filters.maxPrepTime || ''}
              onChange={(e) => handleFilterChange('maxPrepTime', e.target.value)}
              placeholder="e.g., 30"
              className="filter-input"
              min="0"
            />
          </div>

          <div className="filter-section">
            <h4>Maximum Cooking Time (minutes)</h4>
            <input
              type="number"
              value={filters.maxCookTime || ''}
              onChange={(e) => handleFilterChange('maxCookTime', e.target.value)}
              placeholder="e.g., 60"
              className="filter-input"
              min="0"
            />
          </div>

          <div className="filter-section">
            <h4>Must Include Ingredients</h4>
            <div className="ingredient-input">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add ingredient..."
                className="filter-input"
              />
              <button 
                type="button" 
                onClick={handleIngredientAdd}
                className="add-ingredient-btn"
              >
                Add
              </button>
            </div>
            
            {filters.hasIngredients && filters.hasIngredients.length > 0 && (
              <div className="selected-ingredients">
                {filters.hasIngredients.map(ingredient => (
                  <span key={ingredient} className="ingredient-tag">
                    {ingredient}
                    <button 
                      onClick={() => handleIngredientRemove(ingredient)}
                      className="remove-ingredient-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="filter-actions">
            <button 
              onClick={handleClearFilters}
              className="clear-filters-btn"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters; 