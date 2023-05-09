import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel, Card } from 'react-bootstrap';
import { fetchRecipe } from '../service/fetchAPI';
import 'bootstrap/dist/css/bootstrap.css';

const NUMBER_OF_RECOMMENDATIONS = 6;

export default function Recomendations() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      setActiveIndex(0);
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
            <div className="d-flex">

              <Carousel
                className="d-block w-100 overflow-hidden"
                interval={ null }
                onSelect={ (selectedIndex) => { setActiveIndex(selectedIndex); } }
              >
                {[0, 1, 2].map((item) => (
                  <Carousel.Item
                    key={ item }
                    className="d-flex w-100"
                  >
                    {
                      recipes.slice(activeIndex * 2, activeIndex * 2 + 2)
                        .map((recipe, index) => {
                          // const id = recipe.idDrink || recipe.idMeal;
                          // const type = recipe.idDrink ? 'drinks' : 'meals';
                          const title = recipe.strDrink || recipe.strMeal;
                          const photo = recipe.strMealThumb || recipe.strDrinkThumb;
                          return (
                            <Card
                              // onClick={ () => { history.push(`/${type}/${id}`); } }
                              data-testid={
                                `${item * 2 + index}-recommendation-card`
                              }
                              key={ index }
                              className={
                                `d-${
                                  item === activeIndex ? 'flex' : 'none'} flex-row w-50`
                              }
                            >

                              <img
                                src={ photo }
                                alt={ title }
                                className="w-100"
                              />

                              <Carousel.Caption
                                data-testid={
                                  `${item * 2 + index}-recommendation-title`
                                }
                                className={ item === activeIndex ? 'd-flex' : 'd-none' }
                              >
                                {title}
                              </Carousel.Caption>
                            </Card>
                          );
                        })
                    }
                  </Carousel.Item>))}
              </Carousel>
            </div>
          </div>)}

    </div>
  );
}
