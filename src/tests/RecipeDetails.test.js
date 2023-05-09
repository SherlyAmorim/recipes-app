import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mealData, drinkRecommendations, drinkData, mealRecommendations } from './mock/recipeData';
import { isRecipeInProgress } from '../service/localStorage/inProgressRecipes';

jest.mock(
  '../service/localStorage/inProgressRecipes.js',
  () => ({
    isRecipeInProgress: jest.fn(),
  }),
);

const setupFetchStub = (data) => () => new Promise((resolve) => {
  resolve({
    json: () => Promise.resolve({
      ...data,
    }),
  });
});

describe('Testa o componente RecipeDetails', () => {
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('A API deve ser chamada corretamente', async () => {
    const mockFetch = jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(mealData))
      .mockImplementationOnce(setupFetchStub(drinkRecommendations));

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52772');
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('As recomendações de bebida devem ser exibidas corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(mealData))
      .mockImplementationOnce(setupFetchStub(drinkRecommendations));

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52772');
    });

    await waitFor(() => {
      expect(screen.getByTestId('0-recommendation-title')).toHaveTextContent('Teriyaki Chicken Casserole');
    });
  });

  it('As recomendações de comidas devem ser exibidas corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(drinkData))
      .mockImplementationOnce(setupFetchStub(mealRecommendations));

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/178328');
    });

    await waitFor(() => {
      expect(screen.getByTestId('0-recommendation-title')).toHaveTextContent('Funk and Soul');
    });
  });

  it('O botão de iniciar receita deve ser exibido corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(drinkData))
      .mockImplementationOnce(setupFetchStub(mealRecommendations));

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/178329');
    });

    await waitFor(() => {
      expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Start Recipe');
    });
  });

  it('O botão de continuar receita deve ser exibido corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(drinkData))
      .mockImplementationOnce(setupFetchStub(mealRecommendations));

    isRecipeInProgress.mockReturnValue(() => true);

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/178329');
    });

    await waitFor(() => {
      expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Continue Recipe');
    });
  });

  it('O botão de favorito deve ser exibido corretamente', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(setupFetchStub(drinkData))
      .mockImplementationOnce(setupFetchStub(mealRecommendations));

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/178328');
    });

    await waitFor(() => {
      expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', 'whiteHeartIcon.svg');
    });
  });
});
