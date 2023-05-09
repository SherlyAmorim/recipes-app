import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mealData, drinkData } from './mock/recipeData';

const setupFetchStub = (data) => () => new Promise((resolve) => {
  resolve({
    json: () => Promise.resolve({
      ...data,
    }),
  });
});

describe('Teste a página de receitas em progresso', () => {
  it('Teste se os dados são renderizados corretamente da página meals', async () => {
    const mockFetch = jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(mealData));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52977/in-progress');
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('Teriyaki Chicken Casserole');
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Chicken');
      expect(screen.getByTestId('finish-recipe-btn')).toBeDisabled();
      expect(screen.getByTestId('0-ingredient-step')).toHaveTextContent('soy sauce - 3/4 cup');
      expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    });
  });
  it('Teste se os dados são renderizados corretamente da página drinks', async () => {
    const mockFetch = jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(drinkData));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/178328/in-progress');
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toHaveTextContent('Funk and Soul');
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toHaveTextContent('Cocktail');
      expect(screen.getByTestId('finish-recipe-btn')).toBeDisabled();
      expect(screen.getByTestId('0-ingredient-step')).toHaveTextContent('Rum - 2 shots');
      expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    });
  });
});
