import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';

const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

function RecipeDetails() {
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const [recipe, setRecipe] = useState({ recipe: 'empty' });

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = pathname.includes('/meals') ? MEAL_URL : DRINK_URL;
      const response = await fetchRecipe(`${endpoint}lookup.php?i=${id}`);
      console.log(response);
      setRecipe(response);
    };
    fetchData();
  }, [pathname, id]);

  return (
    <div>
      <h1>Recipe</h1>
      <div>{id}</div>
      <p>{JSON.stringify(recipe)}</p>
    </div>
  );
}

export default RecipeDetails;
