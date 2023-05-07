import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [enableSearch, setEnableSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleEnableSearch = useCallback(() => {
    setEnableSearch(!enableSearch);
  }, [enableSearch, setEnableSearch]);

  const searchRecipes = useCallback(async (searchQuery, searchType) => {
    let apiUrl = '';

    switch (searchType) {
    case 'ingredient':
      apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
      break;
    case 'name':
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      break;
    case 'firstLetter':
      if (searchQuery.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`;
      break;
    default:
      break;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSearchResults(data.meals || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const values = useMemo(() => ({
    enableSearch,
    toggleEnableSearch,
    searchRecipes,
    searchResults,
  }), [
    enableSearch,
    toggleEnableSearch,
    searchRecipes,
    searchResults,
  ]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
