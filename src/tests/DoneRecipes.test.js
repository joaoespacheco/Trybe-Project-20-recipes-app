import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { screen } from '@testing-library/react';
import App from '../App';
import mockLocalStorageDoneRecipe from './mocks/mockLocalStorageDoneRecipe';

describe('Testando componente Done Recipes', () => {
    it('Verificando se os elementos são renderizados', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
        const { history} = renderWithRouter(<App />);
        history.push("/done-recipes");

        const foodName = await screen.findByTestId('0-horizontal-name');
        const drinkName = screen.getByTestId('1-horizontal-name');

        expect(foodName).toHaveTextContent("Spicy Arrabiata Penne");
        expect(drinkName).toHaveTextContent("Margarita");


    });
})