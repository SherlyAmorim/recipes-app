import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MealDetails from '../components/MealProgress';
import DrinkDetails from '../components/DrinkProgress';
import Header from '../components/Header';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import Context from '../contexts/MyContext';

const getType = (pathname) => (pathname.split('/')[1] === 'meals' ? 'meal' : 'drink');

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const { setCurrentRecipe } = useContext(Context);

  useEffect(() => {
    setCurrentRecipe(id, getType(pathname));
  }, [id, pathname, setCurrentRecipe]);

  return (
    <div>
      <Header />
      {pathname.includes('/meals')
        ? <MealDetails />
        : <DrinkDetails />}
      <div>
        <ShareBtn />
        <FavoriteBtn />
      </div>
    </div>
  );
}

export default RecipeDetails;
