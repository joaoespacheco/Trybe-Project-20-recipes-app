import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFoodIngredient from './mocks/mockFoodIngredient';
import mockDrinkFirstLetter from './mocks/mockDrinkFirstLetter';
import mockFoodName from './mocks/mockFoodName';

describe('Verificando as funcionabilidades do componente SearchBar', () => {
  it('Verificando se os elementos são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(iconSearch);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verificando a funcionabilidade do filtro ingredient na página Foods', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => mockFoodIngredient),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(iconSearch);

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'chicken');

    const button = screen.getByTestId('exec-search-btn');
    userEvent.click(button);

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  it('Verificando a funcionabilidade do filtro ingredient na página Drinks', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => mockDrinkFirstLetter),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const iconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(iconSearch);

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetter);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'yi');

    const button = screen.getByTestId('exec-search-btn');
    userEvent.click(button);

    await waitFor (() => {
      expect(fetch).not.toHaveBeenCalledTimes(2);
    });
  });
  it('Verificando se o fetch é chamado na página de Drinks', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => mockDrinkFirstLetter),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const iconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(iconSearch);

    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetter);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'y');

    const button = screen.getByTestId('exec-search-btn');
    userEvent.click(button);
 
    await waitFor (() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
  //
  it('Verificando se o fetch é chamado na página de Foods', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => mockFoodName),
    }));

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const iconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(iconSearch);

    const nameSearch = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearch);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, "Piri");

    const button = screen.getByTestId('exec-search-btn');
    userEvent.click(button);
 
    await waitFor (() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
})