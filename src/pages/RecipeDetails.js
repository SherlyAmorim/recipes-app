import React from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';
import Recomendations from '../components/Recomendations';
import { isRecipeDone } from '../service/localStorage/doneRecipes';
import { isRecipeInProgress } from '../service/localStorage/inProgressRecipes';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  return (
    <div>
      {pathname.split('/')[1] === 'meals'
        ? <MealDetails />
        : <DrinkDetails />}
      {!isRecipeDone(id, pathname.split('/')[1] === 'meals' ? 'meal' : 'drink')
      && (
        <Link
          className="btn btn-primary fixed-bottom"
          data-testid="start-recipe-btn"
          to={ `${pathname}/in-progress` }
        >
          {
            isRecipeInProgress(
              id,
              pathname.split('/')[1] === 'meals' ? 'meal' : 'drink',
            ) ? 'Continue Recipe' : 'Start Recipe'
          }
        </Link>)}
      <Recomendations />
    </div>
  );
}

export default RecipeDetails;
