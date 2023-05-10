import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function Meals() {
  return (
    <div>
      <Header />
      <RecipeCard value="Meals" />
      <Footer />
    </div>
  );
}

export default Meals;
