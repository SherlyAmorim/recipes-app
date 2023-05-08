import React from 'react';
import PropTypes from 'prop-types';

function Recipes({ recipes, imageKey, nameKey }) {
  return (
    <div className="recipes">
      {recipes.map((recipe, index) => (
        <div
          key={ recipe.idMeal }
          className="recipe"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe[imageKey] }
            alt={ recipe[nameKey] }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{recipe[nameKey]}</h3>
        </div>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string.isRequired,
      strMealThumb: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
    }),
  ).isRequired,
  imageKey: PropTypes.string.isRequired,
  nameKey: PropTypes.string.isRequired,
};

export default Recipes;
