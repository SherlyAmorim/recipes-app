import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
import { fetchRecipe } from '../service/fetchAPI';
import 'bootstrap/dist/css/bootstrap.css';

const NUMBER_OF_RECOMMENDATIONS = 6;

export default function Recomendations() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const type = pathname.split('/')[1];
    const url = type === 'drinks'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const fetchData = async () => {
      setLoading(true);
      const result = await fetchRecipe(url);
      console.log(result);
      setRecipes(Object.values(result)[0].slice(0, NUMBER_OF_RECOMMENDATIONS));
      setLoading(false);
    };
    fetchData();
  }, [pathname]);

  return (
    <div>
      {loading
        ? <>Loading...</>
        : (

          <div>
            <h2>Recomendations</h2>
            <div className="d-flex flex-nowrap">
              <ul
                className="list-group list-group-horizontal overflow-x-scroll mb-5"
              >
                {
                  recipes.map((recipe, index) => {
                    // const id = recipe.idDrink || recipe.idMeal;
                    // const type = recipe.idDrink ? 'drinks' : 'meals';
                    const title = recipe.strDrink || recipe.strMeal;
                    const photo = recipe.strMealThumb || recipe.strDrinkThumb;
                    return (
                      <li
                        // onClick={ () => { history.push(`/${type}/${id}`); } }
                        data-testid={
                          `${index}-recommendation-card`
                        }
                        key={ index }
                        className="list-group-item m-0 p-0"
                      >
                        <div style={ { width: '50vw' } }>

                          <img
                            src={ photo }
                            alt={ title }
                            width="100%"
                          />

                          <span
                            data-testid={
                              `${index}-recommendation-title`
                            }
                          >
                            {title}
                          </span>
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>)}

    </div>
  );
}
