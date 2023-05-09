export const getFavorites = () => {
  const favorites = localStorage.getItem('favoriteRecipes') || '[]';
  return JSON.parse(favorites);
};

export const isFavorite = (id, type) => (
  getFavorites().some((recipe) => recipe.id === id && recipe.type === type)
);

export const saveFavorite = (recipe) => (
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...getFavorites(), recipe]),
  )
);

export const removeFavorite = (id, type) => (
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify(
      getFavorites()
        .filter((recipe) => !(id === recipe.id && type === recipe.type)),
    ),
  )
);
