import React from 'react';
import { useHistory } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';
import Recomendations from '../components/Recomendations';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();

  return (
    <div>
      {pathname.includes('/meals')
        ? <MealDetails />
        : <DrinkDetails />}
      <Recomendations />
    </div>
  );
}

export default RecipeDetails;
