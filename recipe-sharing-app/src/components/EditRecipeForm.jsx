import { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title || '');
  const [description, setDescription] = useState(recipe.description || '');
  const [category, setCategory] = useState(recipe.category || '');
  const [difficulty, setDifficulty] = useState(recipe.difficulty || '');
  const [prepTime, setPrepTime] = useState(recipe.prepTime || '');
  const [cookTime, setCookTime] = useState(recipe.cookTime || '');
  const [ingredients, setIngredients] = useState(recipe.ingredients ? recipe.ingredients.join(', ') : '');
  const [instructions, setInstructions] = useState(recipe.instructions || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const updatedRecipe = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      difficulty: difficulty.trim(),
      prepTime: prepTime ? parseInt(prepTime) : null,
      cookTime: cookTime ? parseInt(cookTime) : null,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()).filter(Boolean),
      instructions: instructions.trim()
    };
    
    updateRecipe(recipe.id, updatedRecipe);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(recipe.title || '');
    setDescription(recipe.description || '');
    setCategory(recipe.category || '');
    setDifficulty(recipe.difficulty || '');
    setPrepTime(recipe.prepTime || '');
    setCookTime(recipe.cookTime || '');
    setIngredients(recipe.ingredients ? recipe.ingredients.join(', ') : '');
    setInstructions(recipe.instructions || '');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)} className="edit-button">
        Edit Recipe
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h3>Edit Recipe</h3>
      
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title *"
          required
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Beverage">Beverage</option>
        </select>
      </div>

      <div className="form-row">
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="form-select"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="Prep Time (minutes)"
          min="0"
        />
        <input
          type="number"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          placeholder="Cook Time (minutes)"
          min="0"
        />
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description *"
        required
      />

      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma-separated) *"
        required
      />

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Cooking Instructions"
        rows="4"
      />

      <div className="form-buttons">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditRecipeForm; 