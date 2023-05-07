import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const getEmail = () => {
    const email = localStorage.getItem('user');
    return email ? JSON.parse(email) : [];
  };

  const onButtonClick = (param) => {
    history.push(param);
  };

  const onLogoutClick = () => {
    localStorage.clear('user');
    history.push('/');
  };

  return (
    <div>
      <Header />
      <div data-testid="profile-email">{ getEmail().email }</div>
      <button
        data-testid="profile-done-btn"
        onClick={ () => onButtonClick('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => onButtonClick('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ onLogoutClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
