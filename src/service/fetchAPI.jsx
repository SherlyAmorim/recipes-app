export const mealApi = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const dataMeal = await response.json();
  return dataMeal;
};

export const genericSearchMealAPI = async (param) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${param}`);
  const dataSearch = await response.json();
  return dataSearch;
};

export const drinkApi = async () => {
  const response = await fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const dataDrink = await response.json();
  return dataDrink;
};

export const genericSearchDrinkAPI = async (param) => {
  const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/${param}`);
  const dataSearch = await response.json();
  return dataSearch;
};
