import React from 'react';
import { fireEvent, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mealData, drinkData } from './mock/recipeData';
// import FavoriteRecipes from '../pages/FavoriteRecipes';
const clipboardCopy = require('clipboard-copy');

const filterByMeal = 'filter-by-meal-btn';
const filterByDrink = 'filter-by-drink-btn';
const filterByAll = 'filter-by-all-btn';

jest.mock('clipboard-copy', () => jest.fn());
clipboardCopy.mockImplementation(() => {});

const mockRecipes = [
  {
    id: mealData.meals[0].idMeal,
    name: mealData.meals[0].strMeal,
    image: mealData.meals[0].strMealThumb,
    type: 'meal',
    category: mealData.meals[0].strCategory,
    nationality: mealData.meals[0].strArea,
    alcoholicOrNot: '',
  },
  {
    id: drinkData.drinks[0].idDrink,
    name: drinkData.drinks[0].strDrink,
    image: drinkData.drinks[0].strDrinkThumb,
    type: 'drink',
    category: drinkData.drinks[0].strCategory,
    nationality: '',
    alcoholicOrNot: drinkData.drinks[0].strAlcoholic,
  },
];

beforeEach(() => {
  localStorage.clear();
});

const FAVORITE_RECIPES_URL = '/favorite-recipes';

test('renders favorite recipes with images and titles', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  expect(screen.getByTestId('page-title')).toHaveTextContent('Favorite Recipes');
  expect(screen.getByText(mockRecipes[0].name)).toBeInTheDocument();
  expect(screen.getByText(mockRecipes[1].name)).toBeInTheDocument();
});

test('filters favorite recipes by type', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  fireEvent.click(screen.getByTestId(filterByMeal));
  expect(screen.queryByText(mockRecipes[0].name)).toBeInTheDocument();
  expect(screen.queryByText(mockRecipes[1].name)).toBeNull();

  fireEvent.click(screen.getByTestId(filterByDrink));
  expect(screen.queryByText(mockRecipes[0].name)).toBeNull();
  expect(screen.queryByText(mockRecipes[1].name)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId(filterByAll));
  expect(screen.queryByText(mockRecipes[0].name)).toBeInTheDocument();
  expect(screen.queryByText(mockRecipes[1].name)).toBeInTheDocument();
});

test('copies link when share button is clicked', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  const shareButton = screen.getAllByAltText('share')[0];
  userEvent.click(shareButton);

  await waitFor(() => {
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });
});

test('removes recipe from favorites when favorite button is clicked', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  const favoriteButton = screen.getAllByTestId('0-horizontal-favorite-btn')[0];
  userEvent.click(favoriteButton);

  expect(screen.queryByText(mockRecipes[0])).not.toBeInTheDocument();
});

test('redirects to recipe details when image is clicked', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  const mealImage = await waitFor(() => screen.getByTestId('0-horizontal-image'));
  userEvent.click(mealImage);

  expect(history.location.pathname).toBe(`/${mockRecipes[0].type}s/${mockRecipes[0].id}`);
});

test('checks if all filter buttons are present', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  expect(screen.getByTestId(filterByAll)).toBeInTheDocument();
  expect(screen.getByTestId(filterByMeal)).toBeInTheDocument();
  expect(screen.getByTestId(filterByDrink)).toBeInTheDocument();
});

test('checks if recipe card elements are present', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(FAVORITE_RECIPES_URL);
  });

  expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
});
