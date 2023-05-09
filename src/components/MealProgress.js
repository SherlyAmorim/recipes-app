import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';
import shareIcon from '../images/shareIcon.svg';

function MealProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    photo: '', title: '', category: '', ingredients: [], instructions: '' });
  const [isChecked, setChecked] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRecipe(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const meals = response.meals[0];
      const ingredients = [];
      const maxIngredients = 20;

      for (let index = 1; index <= maxIngredients; index += 1) {
        const ingredientKey = `strIngredient${index}`;
        const measureKey = `strMeasure${index}`;

        if (meals[ingredientKey] && meals[measureKey]) {
          const ingredient = `${meals[ingredientKey]} - ${meals[measureKey]}`;
          ingredients.push(ingredient);
        }
      }

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        photo: meals.strMealThumb,
        title: meals.strMeal,
        category: meals.strCategory,
        ingredients,
        instructions: meals.strInstructions,
      }));
    };
    console.log(id);
    fetchData();
  }, [id]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    setChecked(savedProgress[id] || []);
  }, [id]);

  const onChecked = ({ target }) => {
    const { checked } = target;
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    savedProgress[id] = savedProgress[id]
      ? [...savedProgress[id], target.name]
      : [target.name];

    if (!checked) {
      savedProgress[id] = savedProgress[id].filter((item) => item !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    setChecked(savedProgress[id]);
  };

  return (
    <div>
      <img src={ recipe.photo } alt={ recipe.title } data-testid="recipe-photo" />
      <div data-testid="recipe-title">{ recipe.title }</div>
      <button data-testid="share-btn"><img src={ shareIcon } alt="share icon" /></button>
      <button data-testid="favorite-btn">Favoritar</button>
      <div data-testid="recipe-category">{ recipe.category}</div>
      <div data-testid="instructions">{ recipe.instructions }</div>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>

      {recipe.ingredients.map((element, index) => {
        const isIngredientChecked = isChecked.includes(element);
        const textDecoration = isIngredientChecked
          ? 'line-through solid rgb(0, 0, 0)' : '';

        return (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration } }
          >
            <input
              type="checkbox"
              name={ element }
              onChange={ onChecked }
              id={ element }
              value={ element }
              checked={ isIngredientChecked }
            />
            <label htmlFor={ element }>
              {element}
            </label>
          </label>
        );
      })}
    </div>
  );
}

export default MealProgress;
