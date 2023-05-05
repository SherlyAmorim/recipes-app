import React from 'react';
// import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const headerStyle = {
  display: 'flex',
  width: '100%',
  position: 'absolute',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  backgroundColor: 'white',
  top: 0,
};

function Header() {
  // const history = useHistory();

  return (
    <header style={ headerStyle }>
      <h2 data-testi="page-title">title</h2>
      <div>
        <button>
          <img
            alt="search-top-btn"
            data-testid="search-top-btn"
            src={ searchIcon }

          />
        </button>
        <img
          alt="profile-top-btn"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </div>
    </header>
  );
}

export default Header;
