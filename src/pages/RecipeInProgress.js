import React from 'react';
import { useHistory } from 'react-router-dom';
import MealDetails from '../components/MealProgress';
import DrinkDetails from '../components/DrinkProgress';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();

  return (
    <div>
      {pathname.includes('/meals')
        ? <MealDetails />
        : <DrinkDetails />}
    </div>
  );
}

export default RecipeDetails;
