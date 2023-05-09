import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';
import Recomendations from '../components/Recomendations';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <div>
      {pathname.includes('/meals')
        ? <MealDetails />
        : <DrinkDetails />}
      <Link
        // onClick={ history.push(`${pathname}in-progress`) }
        className="btn btn-primary fixed-bottom"
        data-testid="start-recipe-btn"
        to={ `${pathname}/in-progress` }
      >
        Start Recipe
      </Link>
      <Recomendations />
    </div>
  );
}

export default RecipeDetails;
