import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando componente Footer', () => {
  it('Testando se os icones de footer são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    
    history.push('/foods');
    
    const iconFood = screen.getByTestId('food-bottom-btn');
    const iconDrink = screen.getByTestId('drinks-bottom-btn');

    expect(iconFood).toBeInTheDocument();
    expect(iconDrink).toBeInTheDocument();
  })

  it('Se ao clicar no icone food ocorre o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const iconFood = screen.getByTestId('food-bottom-btn');
    userEvent.click(iconFood);

    expect(history.location.pathname).toBe('/foods');
  })

  it('Se ao clicar no icone drink ocorre o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/profile');

    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(iconDrink);

    expect(history.location.pathname).toBe('/drinks');
  })
})