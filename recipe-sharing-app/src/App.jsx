import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import AddRecipeForm from './components/AddRecipeForm';
import AdvancedFilters from './components/AdvancedFilters';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Recipe Sharing App</h1>
              <AddRecipeForm />
              <SearchBar />
              <AdvancedFilters />
              <RecommendationsList />
              <FavoritesList />
              <RecipeList />
            </>
          } />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
