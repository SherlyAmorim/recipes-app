import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';

function DrinkProgress() {
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
  const [isChecked, setChecked] = useState({});
  const [canFinish, setCanFinish] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchRecipe(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinks = response.drinks[0];
      const ingredients = [];
      const maxIngredients = 15;
      for (let index = 1; index <= maxIngredients; index += 1) {
        const ingredientKey = `strIngredient${index}`;
        const measureKey = `strMeasure${index}`;

        if (drinks[ingredientKey] && drinks[measureKey]) {
          const ingredient = `${drinks[ingredientKey]} - ${drinks[measureKey]}`;
          ingredients.push(ingredient);
        }
      }

      const tags = drinks.strTags ? drinks.strTags.split(',') : [];

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        photo: drinks.strDrinkThumb,
        title: drinks.strDrink,
        category: drinks.strCategory,
        ingredients,
        instructions: drinks.strInstructions,
        isAlcoholic: drinks.strAlcoholic,
        tags,
        nationality: '',
      }));
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };
    setChecked(savedProgress.drinks[id] || []);
  }, [id]);

  const onChecked = ({ target }) => {
    const { checked } = target;
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      drinks: {},
      meals: {},
    };

    if (!savedProgress.drinks[id]) {
      savedProgress.drinks[id] = [];
    }

    if (checked) {
      savedProgress.drinks[id].push(target.name);
    } else {
      savedProgress.drinks[id] = savedProgress.meals[id]
        .filter((item) => item !== target.name);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
    setChecked(savedProgress.drinks[id]);
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
      type: 'drink',
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

export default DrinkProgress;
