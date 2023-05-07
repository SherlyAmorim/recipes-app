import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { mealApi, cockTailApi } from '../service/fetchAPI';
import Recipes from './Recipes';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [searchInformationRadio, setSearchInformationRadio] = useState('');
  const [recipes, setRecipes] = useState([]);

  const history = useHistory();
  const { location } = history;

  const redirectToDetailsPage = (data, route, id) => {
    if (data.length === 1) {
      if (route === 'meals') {
        history.push(`/meals/${data[0][id]}`);
      } else if (route === 'drinks') {
        history.push(`/drinks/${data[0][id]}`);
      }
    }
  };

  const sliceResults = (results) => {
    const MAX_RESULTS = 12;
    return results.slice(0, MAX_RESULTS);
  };

  const arrayHandling = (data, string) => {
    if (data[string] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    const recipeArray = sliceResults(data[string]);
    if (string === 'meals') {
      redirectToDetailsPage(recipeArray, 'meals', 'idMeal');
    } else {
      redirectToDetailsPage(recipeArray, 'drinks', 'idDrink');
    }
    console.log(recipeArray);
    setRecipes(recipeArray);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchInformationRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    try {
      let data = {};
      if (location.pathname === '/meals') {
        data = await mealApi(searchInput, searchInformationRadio);
        arrayHandling(data, 'meals');
      } else {
        data = await cockTailApi(searchInput, searchInformationRadio);
        arrayHandling(data, 'drinks');
      }
    } catch (error) {
      console.error(error);
      global.alert('An error occurred while fetching data. Please try again.');
    }
  };

  const imageKey = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameKey = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  return (
    <>
      <form className="SearchBar" onSubmit={ handleSearchSubmit }>
        <input
          type="text"
          name="searchInput"
          placeholder="Search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target }) => setSearchInput(target.value) }
        />

        <label htmlFor="ingredient-radio">
          <input
            type="radio"
            name="searchInformationRadio"
            id="ingredient-radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ ({ target }) => setSearchInformationRadio(target.value) }
          />
          Ingredient
        </label>

        <label htmlFor="name-radio">
          <input
            type="radio"
            name="searchInformationRadio"
            id="name-radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target }) => setSearchInformationRadio(target.value) }
          />
          Name
        </label>

        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            name="searchInformationRadio"
            id="first-letter-radio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ ({ target }) => setSearchInformationRadio(target.value) }
          />
          First Letter
        </label>

        <button
          type="submit"
          data-testid="exec-search-btn"
          disabled={ searchInformationRadio === '' }
        >
          Search
        </button>
      </form>
      <Recipes recipes={ recipes } imageKey={ imageKey } nameKey={ nameKey } />
    </>
  );
}
