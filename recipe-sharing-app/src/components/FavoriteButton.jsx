import React from 'react';
import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId, size = 'medium' }) => {
  const { toggleFavorite, isFavorite } = useRecipeStore(state => ({
    toggleFavorite: state.toggleFavorite,
    isFavorite: state.isFavorite
  }));

  const favorited = isFavorite(recipeId);

  const handleToggleFavorite = () => {
    try {
      toggleFavorite(recipeId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const sizeClasses = {
    small: 'favorite-btn-small',
    medium: 'favorite-btn-medium',
    large: 'favorite-btn-large'
  };

  return (
    <button 
      onClick={handleToggleFavorite}
      className={`favorite-btn ${sizeClasses[size]} ${favorited ? 'favorited' : ''}`}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorited ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton; 