import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const doneRecipesMock = {
  meals: [
    {
      idMeal: '52967',
      strMeal: 'Home-made Mandazi',
      strCategory: 'Breakfast',
      strArea: 'Kenyan',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/thazgm1555350962.jpg',
      strTags: 'Baking,Breakfast,Egg,Warm,Snack',
      dateModified: '31/09/2021',
    },
    {
      idMeal: '00000',
      strMeal: 'bolo',
      strCategory: 'Breakfast',
      strArea: 'Brazilian',
      strMealThumb: 'https://cdn0.tudoreceitas.com/pt/posts/9/4/3/bolo_comum_de_liquidificador_10349_orig.jpg',
      strTags: 'Baking,Breakfast,Egg,Warm,Snack',
      dateModified: '10/05/2022',
    },
  ],
};

function DoneRecipesElements() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const recipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
     || doneRecipesMock;

    setDoneRecipes(recipesFromLocalStorage.meals);
  }, []);

  return (
    <>
      <form>
        <button
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <br />
      </form>
      {
        doneRecipes.map((meal, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ meal.strMealThumb }
              alt="imagem da receita"
              height="120"
              width="200"
            />
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              { `${meal.strMeal}` }
            </h3>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              <img
                src={ shareIcon }
                alt="Icone de Compartilhamento da receita"
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${meal.strCategory}` }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Done in: ${meal.dateModified}` }
            </p>
            {
              meal.strTags.split(',').map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { `${tag}` }
                </p>))
            }
          </div>
        ))
      }
    </>
  );
}

export default DoneRecipesElements;
