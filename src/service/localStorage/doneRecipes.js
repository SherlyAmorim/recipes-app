export const getDoneRecipes = () => {
  const doneRecipes = localStorage.getItem('doneRecipes') || '[]';
  return JSON.parse(doneRecipes);
};

export const isRecipeDone = (id, type) => (
  getDoneRecipes().some((recipe) => recipe.id === id && recipe.type === type)
);
