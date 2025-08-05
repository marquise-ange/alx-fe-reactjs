import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  // Initial state
  recipes: [],
  searchTerm: '',
  filters: {
    category: '',
    difficulty: '',
    maxPrepTime: '',
    maxCookTime: '',
    hasIngredients: []
  },
  favorites: [],
  recommendations: [],
  
  // Basic CRUD operations
  addRecipe: (newRecipe) => {
    try {
      set(state => ({ recipes: [...state.recipes, newRecipe] }));
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  },
  
  setRecipes: (recipes) => {
    try {
      set({ recipes: recipes || [] });
    } catch (error) {
      console.error('Error setting recipes:', error);
    }
  },
  
  updateRecipe: (recipeId, updatedRecipe) => {
    try {
      set(state => ({
        recipes: state.recipes.map(recipe => 
          recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
        )
      }));
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  },
  
  deleteRecipe: (recipeId) => {
    try {
      set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
      }));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  },
  
  // Search and filter actions
  setSearchTerm: (searchTerm) => {
    try {
      set({ searchTerm: searchTerm || '' });
    } catch (error) {
      console.error('Error setting search term:', error);
    }
  },
  
  setFilter: (filterType, value) => {
    try {
      set(state => ({
        filters: { ...state.filters, [filterType]: value }
      }));
    } catch (error) {
      console.error('Error setting filter:', error);
    }
  },
  
  clearFilters: () => {
    try {
      set({ 
        searchTerm: '', 
        filters: {
          category: '',
          difficulty: '',
          maxPrepTime: '',
          maxCookTime: '',
          hasIngredients: []
        }
      });
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  },
  
  // Favorites management
  addFavorite: (recipeId) => {
    try {
      set(state => {
        if (!state.favorites.includes(recipeId)) {
          return { favorites: [...state.favorites, recipeId] };
        }
        return state;
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },
  
  removeFavorite: (recipeId) => {
    try {
      set(state => ({
        favorites: state.favorites.filter(id => id !== recipeId)
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },
  
  toggleFavorite: (recipeId) => {
    try {
      set(state => {
        const isFavorite = state.favorites.includes(recipeId);
        if (isFavorite) {
          return { favorites: state.favorites.filter(id => id !== recipeId) };
        } else {
          return { favorites: [...state.favorites, recipeId] };
        }
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },
  
  // Recommendations system
  generateRecommendations: () => {
    try {
      const { recipes, favorites } = get();
      
      if (favorites.length === 0) {
        // If no favorites, recommend popular recipes (most recent)
        const recommended = recipes
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);
        set({ recommendations: recommended });
        return;
      }
      
      // Get favorite recipe categories and difficulties
      const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
      const favoriteCategories = [...new Set(favoriteRecipes.map(recipe => recipe.category).filter(Boolean))];
      const favoriteDifficulties = [...new Set(favoriteRecipes.map(recipe => recipe.difficulty).filter(Boolean))];
      
      // Generate recommendations based on favorites
      const recommended = recipes
        .filter(recipe => !favorites.includes(recipe.id)) // Don't recommend already favorited recipes
        .map(recipe => {
          let score = 0;
          
          // Category match
          if (favoriteCategories.includes(recipe.category)) {
            score += 3;
          }
          
          // Difficulty match
          if (favoriteDifficulties.includes(recipe.difficulty)) {
            score += 2;
          }
          
          // Similar prep time (within 15 minutes)
          const avgPrepTime = favoriteRecipes.reduce((sum, r) => sum + (r.prepTime || 0), 0) / favoriteRecipes.length;
          if (recipe.prepTime && Math.abs(recipe.prepTime - avgPrepTime) <= 15) {
            score += 1;
          }
          
          // Similar cook time (within 30 minutes)
          const avgCookTime = favoriteRecipes.reduce((sum, r) => sum + (r.cookTime || 0), 0) / favoriteRecipes.length;
          if (recipe.cookTime && Math.abs(recipe.cookTime - avgCookTime) <= 30) {
            score += 1;
          }
          
          // Ingredient overlap
          if (recipe.ingredients && favoriteRecipes.some(fav => 
            fav.ingredients && recipe.ingredients.some(ingredient =>
              fav.ingredients.some(favIngredient => 
                favIngredient.toLowerCase().includes(ingredient.toLowerCase()) ||
                ingredient.toLowerCase().includes(favIngredient.toLowerCase())
              )
            )
          )) {
            score += 2;
          }
          
          return { ...recipe, recommendationScore: score };
        })
        .filter(recipe => recipe.recommendationScore > 0)
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 6)
        .map(recipe => {
          const { recommendationScore, ...recipeWithoutScore } = recipe;
          return recipeWithoutScore;
        });
      
      set({ recommendations: recommended });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      set({ recommendations: [] });
    }
  },
  
  // Computed filtered recipes with advanced filtering
  getFilteredRecipes: () => {
    try {
      const { recipes, searchTerm, filters } = get();
      let filtered = [...(recipes || [])];
      
      // Text search filter
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(recipe => 
          recipe.title && recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description && recipe.description.toLowerCase().includes(searchLower) ||
          (recipe.ingredients && recipe.ingredients.some(ingredient => 
            ingredient && ingredient.toLowerCase().includes(searchLower)
          )) ||
          (recipe.instructions && recipe.instructions.toLowerCase().includes(searchLower))
        );
      }
      
      // Category filter
      if (filters.category) {
        filtered = filtered.filter(recipe => 
          recipe.category && recipe.category === filters.category
        );
      }
      
      // Difficulty filter
      if (filters.difficulty) {
        filtered = filtered.filter(recipe => 
          recipe.difficulty && recipe.difficulty === filters.difficulty
        );
      }
      
      // Preparation time filter
      if (filters.maxPrepTime) {
        filtered = filtered.filter(recipe => 
          recipe.prepTime && recipe.prepTime <= parseInt(filters.maxPrepTime)
        );
      }
      
      // Cooking time filter
      if (filters.maxCookTime) {
        filtered = filtered.filter(recipe => 
          recipe.cookTime && recipe.cookTime <= parseInt(filters.maxCookTime)
        );
      }
      
      // Ingredients filter
      if (filters.hasIngredients && filters.hasIngredients.length > 0) {
        filtered = filtered.filter(recipe => 
          recipe.ingredients && filters.hasIngredients.every(ingredient =>
            recipe.ingredients.some(recipeIngredient =>
              recipeIngredient && recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
            )
          )
        );
      }
      
      return filtered;
    } catch (error) {
      console.error('Error getting filtered recipes:', error);
      return [];
    }
  },
  
  // Get favorite recipes
  getFavoriteRecipes: () => {
    try {
      const { recipes, favorites } = get();
      return recipes.filter(recipe => favorites.includes(recipe.id));
    } catch (error) {
      console.error('Error getting favorite recipes:', error);
      return [];
    }
  },
  
  // Check if recipe is favorited
  isFavorite: (recipeId) => {
    try {
      const { favorites } = get();
      return favorites.includes(recipeId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  },
  
  // Get unique values for filter options
  getCategories: () => {
    try {
      const { recipes } = get();
      const categories = (recipes || [])
        .map(recipe => recipe.category)
        .filter(Boolean);
      return [...new Set(categories)];
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },
  
  getDifficulties: () => {
    try {
      const { recipes } = get();
      const difficulties = (recipes || [])
        .map(recipe => recipe.difficulty)
        .filter(Boolean);
      return [...new Set(difficulties)];
    } catch (error) {
      console.error('Error getting difficulties:', error);
      return [];
    }
  },
  
  getAllIngredients: () => {
    try {
      const { recipes } = get();
      const ingredients = (recipes || [])
        .flatMap(recipe => recipe.ingredients || [])
        .filter(Boolean);
      return [...new Set(ingredients)];
    } catch (error) {
      console.error('Error getting ingredients:', error);
      return [];
    }
  }
}))

export default useRecipeStore; 