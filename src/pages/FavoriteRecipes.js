import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storedFavorites) {
      setFavoriteRecipes(storedFavorites);
      setFilteredRecipes(storedFavorites);
    }
  }, []);

  const filterRecipes = (type) => {
    if (type === 'all') {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const recipeType = type === 'meals' ? 'meal' : 'drink';
      const filtered = favoriteRecipes.filter((recipe) => recipe.type === recipeType);
      setFilteredRecipes(filtered);
    }
  };

  const handleShare = (recipeId, recipeType) => {
    const shareUrl = `${window.location.origin}/${recipeType}s/${recipeId}`;
    copy(shareUrl);
    setLinkCopied(true);
    const THREE_SECONDS = 3000;
    setTimeout(
      () => setLinkCopied(false),
      THREE_SECONDS,
    );
  };

  const handleFavorite = (recipe) => {
    const updatedFavorites = favoriteRecipes.filter((fav) => fav.id !== recipe.id);
    setFavoriteRecipes(updatedFavorites);
    setFilteredRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('meals') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drinks') }
      >
        Drinks
      </button>

      {linkCopied && <p>Link copied!</p>}

      <div>
        {filteredRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/meals/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality}
              {' '}
              -
              {' '}
              {recipe.category}
            </p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {' '}
              {recipe.type === 'drink' ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}`}

            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              <Link
                to={ `/meals/${recipe.id}` }
              >
                {recipe.name}
              </Link>

            </p>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => handleShare(recipe.id, recipe.type) }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleFavorite(recipe) }
              src={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="favorite" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
