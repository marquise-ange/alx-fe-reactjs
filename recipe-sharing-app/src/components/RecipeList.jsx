import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const RecipeList = () => {
  const { getFilteredRecipes, searchTerm, filters } = useRecipeStore(state => ({
    getFilteredRecipes: state.getFilteredRecipes,
    searchTerm: state.searchTerm,
    filters: state.filters
  }));

  const filteredRecipes = getFilteredRecipes();

  const hasActiveFilters = searchTerm || 
    filters.category || 
    filters.difficulty || 
    filters.maxPrepTime || 
    filters.maxCookTime || 
    filters.hasIngredients.length > 0;

  if (filteredRecipes.length === 0) {
    return (
      <div className="recipe-list">
        {hasActiveFilters ? (
          <>
            <h2>No recipes found</h2>
            <p>No recipes match your current search and filter criteria.</p>
            {searchTerm && <p>Search term: "{searchTerm}"</p>}
          </>
        ) : (
          <>
            <h2>No recipes yet</h2>
            <p>Add your first recipe using the form above!</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>
        {hasActiveFilters ? 'Filtered Recipes' : 'Your Recipes'}
        {hasActiveFilters && <span className="result-count"> ({filteredRecipes.length} found)</span>}
      </h2>
      
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
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
            <FavoriteButton recipeId={recipe.id} size="medium" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList; 