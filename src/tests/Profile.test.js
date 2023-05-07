import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Profile', () => {
  it('Os elementos devem ser renderizados corretamente', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'guilhermelibanori1@gmail.com');
    userEvent.type(passwordInput, 'senha01');
    userEvent.click(submitButton);

    const profileBtn = screen.getByTestId('profile-top-btn');

    userEvent.click(profileBtn);

    const emailinfo = screen.getByTestId('profile-email');
    expect(emailinfo.innerHTML).toBe('guilhermelibanori1@gmail.com');
  });

  it('Teste o botão de done recipes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const doneButton = screen.getByTestId('profile-done-btn');
    expect(doneButton).toBeInTheDocument();

    userEvent.click(doneButton);

    const { location } = history;

    expect(location.pathname).toBe('/done-recipes');
  });

  it('Teste o botão de favorite recipes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);

    const { location } = history;

    expect(location.pathname).toBe('/favorite-recipes');
  });
  it('Teste o botão de logout', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const logoutButton = screen.getByTestId('profile-logout-btn');
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    const { location } = history;

    expect(location.pathname).toBe('/');
  });
});
