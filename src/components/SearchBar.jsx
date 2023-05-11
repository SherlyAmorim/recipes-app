import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Recipes from './Recipes';
import useSearch from '../hooks/useSearch';
import SearchForm from './SearchForm';
import context from '../contexts/MyContext';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    searchInformationRadio,
    setSearchInformationRadio,
    recipes,
    handleSearchSubmit,
  } = useSearch();
  const { setRecipesList } = useContext(context);
  const location = useLocation();
  const imageKey = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameKey = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

  useEffect(() => {
    setRecipesList(recipes);
    console.log('sending recipes to contextAPI');
  }, [setRecipesList, recipes]);

  return (
    <>
      <SearchForm
        searchInput={ searchInput }
        setSearchInput={ setSearchInput }
        searchInformationRadio={ searchInformationRadio }
        setSearchInformationRadio={ setSearchInformationRadio }
        handleSearchSubmit={ handleSearchSubmit }
      />
      <Recipes recipes={ recipes } imageKey={ imageKey } nameKey={ nameKey } />
    </>
  );
}
