import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';
import shareIcon from '../images/shareIcon.svg';

function DrinkProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    photo: '',
    title: '',
    category: '',
    ingredients: [],
    instructions: '',
    isAlcoholic: false });
  const [isChecked, setChecked] = useState({});

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

      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        photo: drinks.strDrinkThumb,
        title: drinks.strDrink,
        category: drinks.strCategory,
        ingredients,
        instructions: drinks.strInstructions,
        isAlcoholic: drinks.strAlcoholic === 'Alcoholic',
      }));
    };
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
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default DrinkProgress;
