const fetchRecipeData = async (value) => {
  const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  if (value === 'Meals') {
    const responseMeal = await fetch(MEALS_URL);
    const data = await responseMeal.json();
    return data.meals;
  }

  if (value === 'Drinks') {
    const responseDrink = await fetch(DRINKS_URL);
    const data = await responseDrink.json();
    return data.drinks;
  }
};

export default fetchRecipeData;
