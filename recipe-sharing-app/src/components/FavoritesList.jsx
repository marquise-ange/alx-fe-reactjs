import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const { getFavoriteRecipes, removeFavorite, generateRecommendations } = useRecipeStore(state => ({
    getFavoriteRecipes: state.getFavoriteRecipes,
    removeFavorite: state.removeFavorite,
    generateRecommendations: state.generateRecommendations
  }));

  const favoriteRecipes = getFavoriteRecipes();

  useEffect(() => {
    // Generate recommendations when favorites change
    generateRecommendations();
  }, [favoriteRecipes.length, generateRecommendations]);

  const handleRemoveFavorite = (recipeId) => {
    try {
      removeFavorite(recipeId);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-list">
        <h2>My Favorites</h2>
        <div className="empty-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Start exploring recipes and click the heart icon to add them to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>My Favorites ({favoriteRecipes.length})</h2>
      <div className="favorites-grid">
        {favoriteRecipes.map(recipe => (
          <div key={recipe.id} className="favorite-recipe-card">
            <div className="recipe-header">
              <h3>{recipe.title}</h3>
              <div className="recipe-meta">
                {recipe.category && <span className="recipe-category">{recipe.category}</span>}
                {recipe.difficulty && <span className={`recipe-difficulty ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>}
              </div>
            </div>
            
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-details">
              {(recipe.prepTime || recipe.cookTime) && (
                <div className="recipe-timing">
                  {recipe.prepTime && <span>Prep: {recipe.prepTime}min</span>}
                  {recipe.cookTime && <span>Cook: {recipe.cookTime}min</span>}
                </div>
              )}
              
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="recipe-ingredients">
                  <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(', ')}
                  {recipe.ingredients.length > 3 && ` +${recipe.ingredients.length - 3} more`}
                </div>
              )}
            </div>
            
            <div className="recipe-actions">
              <Link to={`/recipe/${recipe.id}`} className="view-details-link">
                View Details
              </Link>
              <button 
                onClick={() => handleRemoveFavorite(recipe.id)}
                className="remove-favorite-btn"
                title="Remove from favorites"
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList; 