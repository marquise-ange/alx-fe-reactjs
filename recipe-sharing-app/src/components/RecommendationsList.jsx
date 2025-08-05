import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations, addFavorite, isFavorite } = useRecipeStore(state => ({
    recommendations: state.recommendations,
    generateRecommendations: state.generateRecommendations,
    addFavorite: state.addFavorite,
    isFavorite: state.isFavorite
  }));

  useEffect(() => {
    // Generate recommendations on component mount
    generateRecommendations();
  }, [generateRecommendations]);

  const handleAddFavorite = (recipeId) => {
    try {
      addFavorite(recipeId);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  if (recommendations.length === 0) {
    return (
      <div className="recommendations-list">
        <h2>Recommended for You</h2>
        <div className="empty-recommendations">
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-list">
      <h2>Recommended for You ({recommendations.length})</h2>
      <p className="recommendations-subtitle">
        Based on your favorite recipes and preferences
      </p>
      <div className="recommendations-grid">
        {recommendations.map(recipe => (
          <div key={recipe.id} className="recommendation-recipe-card">
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
                onClick={() => handleAddFavorite(recipe.id)}
                className={`favorite-btn ${isFavorite(recipe.id) ? 'favorited' : ''}`}
                title={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(recipe.id) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList; 