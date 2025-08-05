import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')} className="back-button">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          {recipe.category && <span className="recipe-category">{recipe.category}</span>}
          {recipe.difficulty && <span className={`recipe-difficulty ${recipe.difficulty.toLowerCase()}`}>{recipe.difficulty}</span>}
        </div>
      </div>
      
      <p className="recipe-description">{recipe.description}</p>
      
      {(recipe.prepTime || recipe.cookTime) && (
        <div className="recipe-timing">
          <h3>Timing</h3>
          <div className="timing-details">
            {recipe.prepTime && <span>Preparation Time: {recipe.prepTime} minutes</span>}
            {recipe.cookTime && <span>Cooking Time: {recipe.cookTime} minutes</span>}
          </div>
        </div>
      )}
      
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="recipe-ingredients-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
      
      {recipe.instructions && (
        <div className="recipe-instructions">
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}
      
      <div className="recipe-actions">
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
        <FavoriteButton recipeId={recipe.id} size="large" />
      </div>
      
      <button onClick={() => navigate('/')} className="back-button">
        Back to Recipe List
      </button>
    </div>
  );
};

export default RecipeDetail; 