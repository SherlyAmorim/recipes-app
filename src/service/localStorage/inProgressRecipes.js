export const getInProgressRecipes = () => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') || '{}';
  return JSON.parse(inProgressRecipes);
};

export const getInProgressRecipe = (id, type) => {
  const key = type === 'meal' ? 'meals' : 'drinks';
  const list = getInProgressRecipes()[key];

  return list && list[id];
};

export const isRecipeInProgress = (id, type) => !!getInProgressRecipe(id, type);

/*
{
  drinks: {
      id-da-bebida: [lista-de-ingredientes-utilizados],
      ...
  },
  meals: {
      id-da-comida: [lista-de-ingredientes-utilizados],
      ...
  }
}
*/
