import React, { useState, useContext } from 'react';
import MyContext from '../contexts/MyContext';

export default function SearchBar() {
  const { enableSearch, searchRecipes } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('ingredient');

  const handleSearchClick = () => {
    searchRecipes(searchQuery, searchType);
  };

  return (
    <div>
      { enableSearch ? (
        <>
          <input
            value={ searchQuery }
            onChange={ (e) => setSearchQuery(e.target.value) }
            data-testid="search-input"
          />
          <label htmlFor="ingredient-search-radio">
            Ingredient
            <input
              type="radio"
              id="ingredient-search-radio"
              name="search-type"
              value="ingredient"
              checked={ searchType === 'ingredient' }
              onChange={ (e) => setSearchType(e.target.value) }
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name-search-radio">
            Name
            <input
              type="radio"
              id="name-search-radio"
              name="search-type"
              value="name"
              checked={ searchType === 'name' }
              onChange={ (e) => setSearchType(e.target.value) }
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter-search-radio">
            First Letter
            <input
              type="radio"
              id="first-letter-search-radio"
              name="search-type"
              value="firstLetter"
              checked={ searchType === 'firstLetter' }
              onChange={ (e) => setSearchType(e.target.value) }
              data-testid="first-letter-search-radio"
            />
          </label>
          <button
            onClick={ handleSearchClick }
            data-testid="exec-search-btn"
          >
            Search
          </button>
        </>
      ) : ''}
    </div>
  );
}
