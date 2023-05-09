import React, { useContext } from 'react';
import Context from '../contexts/MyContext';

export default function DrinkDetails() {
  const { loading, currentRecipe } = useContext(Context);
  const recipe = currentRecipe;

  return (
    <div>
      { loading
        ? <h3>Loading...</h3>
        : (
          <div>
            { recipe && recipe.strDrink
              ? (
                <div>
                  <img
                    data-testid="recipe-photo"
                    alt="recipe"
                    src={ recipe.strDrinkThumb }
                    style={ { width: '200px' } }
                  />
                  <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
                  <h3 data-testid="recipe-category">
                    <span>
                      {recipe.strAlcoholic}
                      {' '}
                    </span>
                    {recipe.strCategory}
                  </h3>
                  <h3>Ingredients</h3>
                  <ul>
                    {
                      Object.entries(recipe)
                        .filter(([key, value]) => (
                          key.includes('strIngredient') && value))
                        .map(([key, value]) => {
                          const index = key.match(/\d/g).join('');
                          const measure = `strMeasure${index}`;
                          return (
                            <li key={ index }>
                              <p
                                data-testid={
                                  `${index - 1}-ingredient-name-and-measure`
                                }
                              >
                                {`${recipe[measure]} - ${value}`}
                              </p>
                            </li>
                          );
                        })
                    }
                  </ul>
                  <h3>Instructions</h3>
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                  <track src={ recipe.strYoutube } />
                </div>
              )
              : <h2>Recipe not found</h2>}
          </div>
        )}
    </div>
  );
}
