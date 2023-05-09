import React, { useContext, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import MealDetails from '../components/MealDetails';
import Context from '../contexts/MyContext';
import DrinkDetails from '../components/DrinkDetails';
import Recomendations from '../components/Recomendations';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import { isRecipeDone } from '../service/localStorage/doneRecipes';
import { isRecipeInProgress } from '../service/localStorage/inProgressRecipes';

const getType = (pathname) => (pathname.split('/')[1] === 'meals' ? 'meal' : 'drink');

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();
  const { setCurrentRecipe } = useContext(Context);

  useEffect(() => {
    setCurrentRecipe(id, getType(pathname));
  }, [id, pathname, setCurrentRecipe]);

  return (
    <div>
      {pathname.split('/')[1] === 'meals'
        ? <MealDetails />
        : <DrinkDetails />}
      {!isRecipeDone(id, getType(pathname))
      && (
        <Link
          className="btn btn-primary fixed-bottom"
          data-testid="start-recipe-btn"
          to={ `${pathname}/in-progress` }
        >
          {
            isRecipeInProgress(
              id,
              getType(pathname),
            ) ? 'Continue Recipe' : 'Start Recipe'
          }
        </Link>)}

      <div>
        <ShareBtn />
        <FavoriteBtn />
      </div>
      <Recomendations />
    </div>
  );
}

export default RecipeDetails;
