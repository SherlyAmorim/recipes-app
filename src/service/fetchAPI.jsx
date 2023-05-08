export const mealApi = async (searchInput, searchRadio) => {
  let response = {};

  if (searchRadio === 'ingredient') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
  } else if (searchRadio === 'name') {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
  } else {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
  }

  if (!response.ok) {
    throw new Error(`Error fetching data from Meal API: ${response.status}`);
  }

  return response.json();
};

export const cockTailApi = async (searchInput, searchRadio) => {
  let response = {};
  if (searchRadio === 'ingredient') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
  } else if (searchRadio === 'name') {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
  } else {
    response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
  }

  if (!response.ok) {
    throw new Error(`Error fetching data from Cocktail API: ${response.status}`);
  }

  return response.json();
};

export const fetchRecipe = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
