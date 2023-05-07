import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const headerStyle = {
  display: 'flex',
  width: '100%',
  position: 'absolute',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid green',
  padding: '3px',
  backgroundColor: 'white',
  top: 0,
};

const captalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

function Header() {
  const history = useHistory();
  const { toggleEnableSearch } = useContext(MyContext);

  const handleProfileClick = useCallback(() => {
    history.push('/profile');
  }, [history]);

  const getPageName = () => {
    const pathname = history?.location?.pathname;
    const arr = pathname.split('/');
    return arr[arr.length - 1].split('-').map((str) => captalize(str)).join(' ');
  };

  return (
    <header style={ headerStyle }>
      <h2
        data-testid="page-title"
      >
        {getPageName()}
      </h2>
      <div>
        {['/profile', '/done-recipes', '/favorite-recipes']
          .includes(history?.location?.pathname)
          ? ''
          : (
            <button onClick={ toggleEnableSearch }>
              <img
                data-testid="search-top-btn"
                alt="search-top-btn"
                src={ searchIcon }
              />
            </button>)}
        <button onClick={ handleProfileClick }>
          <img
            data-testid="profile-top-btn"
            alt="profile-top-btn"
            src={ profileIcon }
          />
        </button>
      </div>
      <SearchBar />
    </header>
  );
}

export default Header;
