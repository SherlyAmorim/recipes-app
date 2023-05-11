import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function Meals() {
  return (
    <div>
      <Header />
      <RecipesList value="Meals" />
      <Footer />
    </div>
  );
}

export default Meals;
