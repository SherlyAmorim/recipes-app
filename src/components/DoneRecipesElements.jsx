import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const doneRecipesMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipesElements() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  localStorage.setItem('doneRecipesMock', JSON.stringify(doneRecipesMock));

  useEffect(() => {
    const recipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'))
     || doneRecipesMock;

    setDoneRecipes(recipesFromLocalStorage);
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
        doneRecipes?.map((elem, index) => (
          <div key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ elem.image }
              alt="imagem da receita"
              height="120"
              width="200"
            />
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              { `${elem.name}` }
            </h3>
            <button data-testid={ `${index}-horizontal-share-btn` }>
              <img
                src={ shareIcon }
                alt="Icone de Compartilhamento da receita"
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${elem.category}` }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Done in: ${elem.doneDate}` }
            </p>
            {
              elem.tags.map((tag) => (
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
