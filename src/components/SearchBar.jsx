import React from 'react';
import { useLocation } from 'react-router-dom';
import Recipes from './Recipes';
import useSearch from '../hooks/useSearch';
import SearchForm from './SearchForm';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    searchInformationRadio,
    setSearchInformationRadio,
    recipes,
    handleSearchSubmit,
  } = useSearch();
  const location = useLocation();
  const imageKey = location.pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameKey = location.pathname === '/meals' ? 'strMeal' : 'strDrink';

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
