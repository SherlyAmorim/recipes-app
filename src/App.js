import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (<Login />) }
        />
        <Route
          exact
          path="/meals"
          render={ () => (<Meals />) }
        />
        <Route
          exact
          path="/drinks"
          render={ () => (<Drinks />) }
        />
        <Route
          exact
          path="/meals/:id"
          render={ () => (<RecipeDetails />) }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ () => (<RecipeDetails />) }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ () => (<RecipeInProgress />) }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ () => (<RecipeInProgress />) }
        />
        <Route
          exact
          path="/profile"
          render={ () => (<Profile />) }
        />
        <Route
          exact
          path="/done-recipes"
          render={ () => (<DoneRecipes />) }
        />
        <Route
          exact
          path="/favorite-recipes"
          render={ () => (<FavoriteRecipes />) }
        />
      </Switch>
    </div>
  );
}

export default App;
