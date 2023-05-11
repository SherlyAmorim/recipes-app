import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function Drinks() {
  return (
    <div>
      <Header />
      <RecipesList value="Drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
