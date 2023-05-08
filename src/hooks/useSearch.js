import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { mealApi, cockTailApi } from '../service/fetchAPI';

export default function useSearch() {
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

  return {
    searchInput,
    setSearchInput,
    searchInformationRadio,
    setSearchInformationRadio,
    recipes,
    handleSearchSubmit,
  };
}
