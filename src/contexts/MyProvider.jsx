import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchRecipe } from '../service/fetchAPI';
import MyContext from './MyContext';

function Provider({ children }) {
  const [enableSearch, setEnableSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const setRecipe = useCallback(async (id, type) => {
    setLoading(true);
    try {
      const url = type === 'meal'
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetchRecipe(url);
      setCurrentRecipe(response[`${type}s`] && response[`${type}s`][0]);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }, [setCurrentRecipe]);

  const setLoadingMemo = useCallback((value) => {
    setLoading(value);
  }, [setLoading]);

  const toggleEnableSearch = useCallback(() => {
    setEnableSearch(!enableSearch);
  }, [enableSearch, setEnableSearch]);

  const values = useMemo(() => ({
    enableSearch,
    loading,
    currentRecipe,
    setCurrentRecipe: setRecipe,
    setLoading: setLoadingMemo,
    toggleEnableSearch,
  }), [
    enableSearch,
    loading,
    currentRecipe,
    setRecipe,
    setLoadingMemo,
    toggleEnableSearch,
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
