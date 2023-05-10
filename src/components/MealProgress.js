import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';

function MealProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState({
    photo: '',
    title: '',
    category: '',
    ingredients: [],
    instructions: '',
    isAlcoholic: '',
    tags: [],
    nationality: '' });
  const [isChecked, setChecked] = useState([]);
  const [canFinish, setCanFinish] = useState(true);

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

      const tags = meals.strTags ? meals.strTags.split(',') : [];

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        photo: meals.strMealThumb,
        title: meals.strMeal,
        category: meals.strCategory,
        ingredients,
        instructions: meals.strInstructions,
        isAlcoholic: '',
        tags,
        nationality: meals.strArea,
      }));
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };
    setChecked(savedProgress.meals[id] || []);
  }, [id]);

  const onChecked = ({ target }) => {
    const { checked } = target;
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };

    if (!savedProgress.meals[id]) {
      savedProgress.meals[id] = [];
    }

    if (checked) {
      savedProgress.meals[id].push(target.name);
    } else {
      savedProgress.meals[id] = savedProgress.meals[id]
        .filter((item) => item !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    setChecked(savedProgress.meals[id]);
  };

  useEffect(() => {
    if (isChecked.length === recipe.ingredients.length) {
      setCanFinish(false);
    } else {
      setCanFinish(true);
    }
  }, [isChecked, recipe.ingredients.length]);

  const onFinish = () => {
    const doneRecipe = {
      id,
      nationality: recipe.nationality,
      name: recipe.title,
      category: recipe.category,
      image: recipe.photo,
      tags: recipe.tags,
      alcoholicOrNot: recipe.isAlcoholic,
      type: 'meal',
      doneDate: new Date().toISOString(),
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    doneRecipes.push(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  return (
    <div>
      <img src={ recipe.photo } alt={ recipe.title } data-testid="recipe-photo" />
      <div data-testid="recipe-title">{ recipe.title }</div>
      <div data-testid="recipe-category">{ recipe.category}</div>
      <div data-testid="instructions">{ recipe.instructions }</div>

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
              style={ { textDecoration } }
            />
            <label htmlFor={ element }>
              {element}
            </label>
          </label>
        );
      })}
      <button
        data-testid="finish-recipe-btn"
        disabled={ canFinish }
        onClick={ onFinish }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default MealProgress;
