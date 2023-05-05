import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Teste se o footer existe e possui o valor de imagem certo do drinksButton', () => {
  render(<App />);
  const drinksBtn = screen.getByTestId('drinks-bottom-btn');
  expect(drinksBtn).toBeInTheDocument();
  expect(drinksBtn).toHaveAttribute('src', 'drinkIcon.svg');
  userEvent.click(drinksBtn);
});
test('Teste se o footer existe e possui o valor de imagem certo do mealsButton', () => {
  render(<App />);

  const mealsBtn = screen.getByTestId('meals-bottom-btn');
  expect(mealsBtn).toBeInTheDocument();
  expect(mealsBtn).toHaveAttribute('src', 'mealIcon.svg');
  userEvent.click(mealsBtn);
});
