import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { mealData, drinkData } from './mock/recipeData';

const filterByMeal = 'filter-by-meal-btn';
const filterByDrink = 'filter-by-drink-btn';
const filterByAll = 'filter-by-all-btn';

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

const renderWithRouter = (component) => render(
  <BrowserRouter>
    {component}
  </BrowserRouter>,
);

test('renders favorite recipes with images and titles', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
  expect(screen.getByText(/test meal/i)).toBeInTheDocument();
  expect(screen.getByText(/test drink/i)).toBeInTheDocument();
  expect(screen.getByAltText(/test meal/i)).toBeInTheDocument();
  expect(screen.getByAltText(/test drink/i)).toBeInTheDocument();
});

test('filters favorite recipes by type', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  fireEvent.click(screen.getByTestId(filterByMeal));
  expect(screen.getByText(/test meal/i)).toBeInTheDocument();
  expect(screen.queryByText(/test drink/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId(filterByDrink));
  expect(screen.queryByText(/test meal/i)).not.toBeInTheDocument();
  expect(screen.getByText(/test drink/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId(filterByAll));
  expect(screen.getByText(/test meal/i)).toBeInTheDocument();
  expect(screen.getByText(/test drink/i)).toBeInTheDocument();
});

test('copies link when share button is clicked', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  const shareButton = screen.getAllByAltText('share')[0];
  userEvent.click(shareButton);

  await waitFor(() => {
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });
});

test('removes recipe from favorites when favorite button is clicked', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  const favoriteButton = screen.getAllByAltText('favorite')[0];
  userEvent.click(favoriteButton);

  expect(screen.queryByText(/test meal/i)).not.toBeInTheDocument();
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'favoriteRecipes',
    JSON.stringify([mockRecipes[1]]),
  );
});

test('redirects to recipe details when image is clicked', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  const mealImage = await waitFor(() => screen.getByAltText(/test meal/i));
  userEvent.click(mealImage);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('checks if all filter buttons are present', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  expect(screen.getByTestId(filterByAll)).toBeInTheDocument();
  expect(screen.getByTestId(filterByMeal)).toBeInTheDocument();
  expect(screen.getByTestId(filterByDrink)).toBeInTheDocument();
});

test('checks if recipe card elements are present', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
});

test('checks if link copied message disappears after 3 seconds', async () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
  renderWithRouter(<FavoriteRecipes />);

  const shareButton = screen.getAllByAltText('share')[0];
  userEvent.click(shareButton);

  await waitFor(() => {
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });

  await waitFor(
    () => {
      expect(screen.queryByText(/link copied!/i)).not.toBeInTheDocument();
    },
    { timeout: 3500 },
  );

  test('checks if filtering recipes works', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
    renderWithRouter(<FavoriteRecipes />);

    const allBtn = screen.getByTestId(filterByAll);
    const mealsBtn = screen.getByTestId(filterByMeal);
    const drinksBtn = screen.getByTestId(filterByDrink);

    userEvent.click(mealsBtn);
    expect(screen.getByText(/test meal/i)).toBeInTheDocument();
    expect(screen.queryByText(/test drink/i)).not.toBeInTheDocument();

    userEvent.click(drinksBtn);
    expect(screen.queryByText(/test meal/i)).not.toBeInTheDocument();
    expect(screen.getByText(/test drink/i)).toBeInTheDocument();

    userEvent.click(allBtn);
    expect(screen.getByText(/test meal/i)).toBeInTheDocument();
    expect(screen.getByText(/test drink/i)).toBeInTheDocument();
  });

  test('checks if removing a recipe from favorites works', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));
    renderWithRouter(<FavoriteRecipes />);

    const favoriteBtn = screen.getAllByAltText('favorite')[0];
    userEvent.click(favoriteBtn);

    const updatedFavorites = mockRecipes.filter((recipe) => recipe.id !== '52772');
    const localStorageMock = jest.spyOn(localStorage, 'setItem');
    localStorageMock.mockImplementation(() => {});

    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(storedFavorites).toEqual(updatedFavorites);

    expect(screen.queryByText(/test meal/i)).not.toBeInTheDocument();
    expect(localStorageMock).toHaveBeenCalledWith(
      'favoriteRecipes',
      JSON.stringify([mockRecipes[1]]),
    );
  });
});
