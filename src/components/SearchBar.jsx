import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

export default function SearchBar() {
  const { enableSearch } = useContext(MyContext);

  return (
    <div>
      { enableSearch
        ? <input data-testid="search-input" />
        : ''}
    </div>
  );
}
