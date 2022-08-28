import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockCategories from './mocks/mockCategories';
import MockCategoryFood from './mocks/MockCategoryFood';
import mockFoodName from './mocks/mockFoodName';

describe('Testando a page foods', () => {
  it('Verifica se o filtro funciona', async () => {
    const { history} = renderWithRouter(<App />);
    history.push("/foods");

    fetch = jest.fn((url) => ({
      json: jest.fn(() => {
        if(url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return mockCategories;
        if(url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return mockFoodName;
        if(url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') return MockCategoryFood;
      }),
    }));

    await waitFor (() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    });

    const beefFilter = screen.getByTestId('Beef-category-filter');

    userEvent.click(beefFilter);

    await waitFor (() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
    });

    const name = screen.getByTestId('0-card-name');

    expect(name).toHaveTextContent('Beef and Mustard Pie');

    userEvent.click(beefFilter);

    await waitFor (() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });

    const foodName = screen.getByTestId('0-card-name');

    expect(foodName).toHaveTextContent('Piri-piri chicken and slaw');
  })
})