import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mealData, drinkRecommendations, drinkData, mealRecommendations } from './mock/recipeData';

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
      expect(screen.getByTestId('0-recommendation-title')).toHaveTextContent('GG');
      expect(screen.getByTestId('1-recommendation-title')).toHaveTextContent('A1');
      expect(screen.getByTestId('2-recommendation-title')).toHaveTextContent('ABC');
      expect(screen.getByTestId('3-recommendation-title')).toHaveTextContent('Kir');
      expect(screen.getByTestId('4-recommendation-title')).toHaveTextContent('747');
      expect(screen.getByTestId('5-recommendation-title')).toHaveTextContent('252');
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
      expect(screen.getByTestId('0-recommendation-title')).toHaveTextContent('Corba');
      expect(screen.getByTestId('1-recommendation-title')).toHaveTextContent('Burek');
      expect(screen.getByTestId('2-recommendation-title')).toHaveTextContent('Sushi');
      expect(screen.getByTestId('3-recommendation-title')).toHaveTextContent('Kumpir');
      expect(screen.getByTestId('4-recommendation-title')).toHaveTextContent('Tamiya');
      expect(screen.getByTestId('5-recommendation-title')).toHaveTextContent('Teriyaki Chicken Casserole');
    });
  });
});
