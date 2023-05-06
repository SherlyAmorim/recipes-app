import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Header', () => {
  it('O botão de pesquisa deve ser renderizado na página Meals', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeDefined();
  });

  it('O botão de pesquisa nao deve ser renderizado na pagina Receitas Favoritas', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorite-recipes');
    });

    const searchButton = screen.queryByTestId('search-top-btn');

    expect(searchButton).toBeNull();
  });
});
