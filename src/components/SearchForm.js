import React from 'react';
import PropTypes from 'prop-types';

function SearchForm({ searchInput, setSearchInput,
  searchInformationRadio, setSearchInformationRadio, handleSearchSubmit }) {
  return (
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
  );
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  searchInformationRadio: PropTypes.string.isRequired,
  setSearchInformationRadio: PropTypes.func.isRequired,
  handleSearchSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
