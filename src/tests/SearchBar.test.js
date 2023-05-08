import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';

const INPUT = 'search-input';
const FIRST = 'first-letter-search-radio';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    renderWithRouter(<SearchBar />);
  });

  it('renders search input and radio buttons', () => {
    const searchInput = screen.getByTestId(INPUT);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId(FIRST);

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('updates search input value when typed', () => {
    const searchInput = screen.getByTestId(INPUT);
    userEvent.type(searchInput, 'chicken');
    expect(searchInput).toHaveValue('chicken');
  });

  it('selects radio buttons correctly', () => {
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId(FIRST);

    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();

    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
  });

  it('displays an alert when first letter search has more than one character', async () => {
    const searchInput = screen.getByTestId(INPUT);
    const firstLetterRadio = screen.getByTestId(FIRST);
    const searchButton = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'chicken');
    userEvent.click(firstLetterRadio);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    userEvent.click(searchButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });

    alertSpy.mockRestore();
  });
});
