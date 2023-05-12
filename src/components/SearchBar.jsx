import React from 'react';
import useSearch from '../hooks/useSearch';
import SearchForm from './SearchForm';

export default function SearchBar() {
  const {
    searchInput,
    setSearchInput,
    searchInformationRadio,
    setSearchInformationRadio,
    handleSearchSubmit,
  } = useSearch();

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
