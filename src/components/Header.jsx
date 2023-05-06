import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
            <button>
              <img
                alt="search-top-btn"
                data-testid="search-top-btn"
                src={ searchIcon }
              />
            </button>)}
        <button>
          <img
            alt="profile-top-btn"
            data-testid="profile-top-btn"
            src={ profileIcon }
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
