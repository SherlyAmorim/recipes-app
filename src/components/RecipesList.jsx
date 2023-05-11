import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from '../contexts/MyContext';
import fetchRecipeData from '../service/fetchRecipes';
import fetchCategoryData from '../service/fetchCategory';
import RecipeCard from './RecipeCard';

function RecipesList({ value }) {
  const { recipesList, setRecipesList } = useContext(context);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchRecipeData(value);
      setRecipesList(data);
    };
    const fetchCategories = async () => {
      const data = await fetchCategoryData(value);
      setCategories(data);
    };
    fetchRecipes();
    fetchCategories();
  }, [value, setRecipesList]);

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  const results = recipesList.slice(0, MAX_RECIPES);
  const resultsCategories = categories.slice(0, MAX_CATEGORIES);

  return (
    <div>
      {/* {value === 'Meals' && (results.map((recipe, index) => (
        <div
          key={ recipe.idMeal }
          className="recipe"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
        </div>
      )))}
      {value === 'Drinks' && (results.map((recipe, index) => (
        <div
          key={ recipe.idDrink }
          className="recipe"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
        </div>
      )))} */}
      {value === 'Meals' && (resultsCategories.map((category, index) => (
        <button
          key={ index }
          className="category"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      )))}
      {value === 'Drinks' && (resultsCategories.map((category, index) => (
        <button
          key={ index }
          className="category"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      )))}

      <div>
        {
          results.map((recipe, index) => {
            const { idMeal, strMealThumb, strMeal } = recipe;
            const { idDrink, strDrinkThumb, strDrink } = recipe;
            const id = idMeal || idDrink;
            const name = strMeal || strDrink;
            const photo = strMealThumb || strDrinkThumb;
            return (
              <RecipeCard
                key={ id }
                id={ id }
                type={ idMeal ? 'meals' : 'drinks' }
                title={ name }
                photo={ photo }
                index={ index }
              />
            );
          })
        }
      </div>
    </div>
  );
}

RecipesList.propTypes = {
  value: PropTypes.string.isRequired,
};

export default RecipesList;
