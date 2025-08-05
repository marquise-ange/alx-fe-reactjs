import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      difficulty: difficulty.trim(),
      prepTime: prepTime ? parseInt(prepTime) : null,
      cookTime: cookTime ? parseInt(cookTime) : null,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()).filter(Boolean),
      instructions: instructions.trim()
    };
    
    addRecipe(newRecipe);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setDifficulty('');
    setPrepTime('');
    setCookTime('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-recipe-form">
      <h3>Add New Recipe</h3>
      
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

      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm; 