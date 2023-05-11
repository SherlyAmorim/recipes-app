import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    if (recipes.length !== 0) {
      setRecipesList(recipes);
    }
    console.log('recipes', recipes);
  }, [setRecipesList, recipes]);

  return (
    <SearchForm
      searchInput={ searchInput }
      setSearchInput={ setSearchInput }
      searchInformationRadio={ searchInformationRadio }
      setSearchInformationRadio={ setSearchInformationRadio }
      handleSearchSubmit={ handleSearchSubmit }
    />
  );
}
