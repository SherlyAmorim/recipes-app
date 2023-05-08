import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const SEARCH_TOP_BTN = 'search-top-btn';

describe('Testa o componente Header', () => {
  it('O botão de pesquisa deve ser renderizado na página Meals', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchButton).toBeDefined();
  });

  it('O botão de pesquisa nao deve ser renderizado na pagina Receitas Favoritas', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorite-recipes');
    });

    const searchButton = screen.queryByTestId(SEARCH_TOP_BTN);

    expect(searchButton).toBeNull();
  });

  it('O botao de perfil deve redirecionar o usuario para a pagina Profile', () => {
    const { history } = renderWithRouter(<App />);
    const mockedPush = jest.spyOn(history, 'push');
    act(() => {
      history.push('/meals');
    });
    const profileButton = screen.queryByTestId('profile-top-btn');
    act(() => {
      userEvent.click(profileButton);
    });

    expect(mockedPush).toHaveBeenCalledWith('/profile');
  });

  it('A barra de busca deve aparecer ao clicar no botão de busca', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeDefined();
  });

  it('A barra de busca deve desaparecer ao clicar no botão de busca novamente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);
    userEvent.click(searchButton);

    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeNull();
  });

  it('O título da página deve ser renderizado corretamente em diferentes páginas', () => {
    const { history } = renderWithRouter(<App />);

    const testPageTitle = (path, title) => {
      act(() => {
        history.push(path);
      });

      const pageTitle = screen.getByTestId('page-title');
      expect(pageTitle.textContent).toBe(title);
    };

    testPageTitle('/meals', 'Meals');
    testPageTitle('/drinks', 'Drinks');
    testPageTitle('/profile', 'Profile');
    testPageTitle('/favorite-recipes', 'Favorite Recipes');
    testPageTitle('/done-recipes', 'Done Recipes');
  });
});
