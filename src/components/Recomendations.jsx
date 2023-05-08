import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';
import RecipeCard from './RecipeCard';

const NUMBER_OF_RECOMENDATIONS = 6;

export default function Recomendations() {
  const { location: { pathname } } = useHistory();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const type = pathname.split('/')[1];
    const url = type === 'drinks'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const fetchData = async () => {
      const result = await fetchRecipe(url);
      console.log(result);
      setRecipes(Object.values(result)[0].splice(0, NUMBER_OF_RECOMENDATIONS));
    };
    fetchData();
  }, [pathname]);
  return (
    <div>
      {
        recipes.map((recipe) => {
          const id = recipe.idDrink || recipe.idMeal;
          const type = recipe.idDrink ? 'drinks' : 'meals';
          const title = recipe.strDrink || recipe.strMeal;
          const photo = recipe.strMealThumb || recipe.strDrinkThumb;
          return (
            <RecipeCard
              key={ id }
              id={ id }
              type={ type }
              title={ title }
              photo={ photo }
            />
          );
        })
      }
    </div>
  );
}
