import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
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
  const [typeRecipes, setTypeRecipes] = useState([]);

  localStorage.setItem('doneRecipesMock', JSON.stringify(doneRecipesMock));

  useEffect(() => {
    const recipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipesMock'));
    //  || doneRecipesMock;
    if (recipesFromLocalStorage) {
      setDoneRecipes(recipesFromLocalStorage);
      setTypeRecipes(recipesFromLocalStorage);
    }
  }, []);

  const filterDoneRecipes = (type) => {
    if (type === 'all') {
      setTypeRecipes(doneRecipes);
    } else {
      const recipeType = type === 'meals' ? 'meal' : 'drink';
      const filtered = doneRecipes.filter((recipe) => recipe.type === recipeType);
      setTypeRecipes(filtered);
      console.log(typeRecipes);
    }
  };

  return (
    <>
      {/* {filterDoneRecipes()} */}
      {
        console.log(typeRecipes)
      }
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterDoneRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterDoneRecipes('meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterDoneRecipes('drinks') }
        >
          Drinks
        </button>
        <br />
      </form>
      {
        typeRecipes?.map((recipe, index) => (
          <Card key={ index }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="imagem da receita"
              height="120"
              width="200"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>
              { `${recipe.name}` }
            </h3>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              style={ { height: '40px', width: '50px' } }
              src={ shareIcon }
            >
              <img
                src={ shareIcon }
                alt="Icone de Compartilhamento da receita"
                style={ { height: '35px', width: '35px' } }
              />
            </button>
            {
              typeRecipes[index].type === 'meal'
                && <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
            }
            {
              typeRecipes[index].type === 'drink'
                  && <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.alcoholicOrNot}`}
                  </p>
            }
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Done in: ${recipe.doneDate}` }
            </p>
            {
              typeRecipes[index].type === 'meal'
              && recipe.tags.slice(0, 2).map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { `${tag}` }
                </p>))
            }
          </Card>
        ))
      }
    </>
  );
}

export default DoneRecipesElements;
