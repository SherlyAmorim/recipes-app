import React from 'react';
import { useHistory } from 'react-router-dom';
import MealDetails from '../components/MealProgress';
import DrinkDetails from '../components/DrinkProgress';
import Header from '../components/Header';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();

  return (
    <div>
      <Header />
      {pathname.includes('/meals')
        ? <MealDetails />
        : <DrinkDetails />}
    </div>
  );
}

export default RecipeDetails;
