import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../service/fetchAPI';

export default function MealDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ recipe: 'empty' });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchRecipe(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipe(response.meals ? response.meals[0] : {});
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      { loading
        ? <h3>Loading...</h3>
        : (
          <div>
            { recipe.strMeal
              ? (
                <div>
                  <img
                    data-testid="recipe-photo"
                    alt="recipe"
                    src={ recipe.strMealThumb }
                    style={ { width: '200px' } }
                  />
                  <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
                  <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
                  <h3>Ingredients</h3>
                  <ul>
                    {
                      Object.entries(recipe)
                        .filter(([key, value]) => (
                          key.includes('strIngredient') && value))
                        .map(([key, value]) => {
                          if (key.includes('strIngredient') && value) {
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
                          }
                          return null;
                        })
                    }
                  </ul>
                  <h3>Instructions</h3>
                  <p data-testid="instructions">{recipe.strInstructions}</p>
                  <track src={ recipe.strYoutube } />
                  <iframe
                    title={ recipe.strMeal }
                    width="560"
                    src={
                      `https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`
                    }
                    allowFullScreen
                    allow="autoplay; encrypted-media; picture-in-picture"
                    data-testid="video"
                  />
                </div>
              )
              : <h2>Recipe not found</h2>}
          </div>
        )}
    </div>
  );
}
