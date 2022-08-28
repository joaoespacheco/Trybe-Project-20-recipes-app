import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import mockLocalStorageDoneRecipe from './mocks/mockLocalStorageDoneRecipe';

jest.mock('clipboard-copy');

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

    it('Verificando se os elementos são renderizados', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
        const { history} = renderWithRouter(<App />);
        history.push("/done-recipes");

        const foodName = await screen.findByTestId('0-horizontal-name');
        const buttonShare = screen.getByTestId('0-horizontal-share-btn');

        userEvent.click(buttonShare);

        const copyText = screen.getByText('Link copied!');

        expect(foodName).toHaveTextContent("Spicy Arrabiata Penne");
        expect(buttonShare).toBeInTheDocument();
        expect(copyText).toBeInTheDocument();
    });

    it('Verificando se os elementos são renderizados', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
        const { history} = renderWithRouter(<App />);
        history.push("/done-recipes");

        const foodName = await screen.findByTestId('0-horizontal-name');
        const buttonDrinkFilter = screen.getByTestId('filter-by-drink-btn');

        expect(foodName).toHaveTextContent("Spicy Arrabiata Penne");

        userEvent.click(buttonDrinkFilter);

        const drinkName = screen.getByTestId('0-horizontal-name');

        expect(drinkName).toHaveTextContent('Margarita');
    });

    it('Verificando se os elementos são renderizados', async () => {
        localStorage.removeItem('doneRecipes');

        const { history} = renderWithRouter(<App />);
        history.push("/done-recipes");

        const foodName = screen.queryByTestId('0-horizontal-name');
        const buttonDrinkFilter = screen.getByTestId('filter-by-drink-btn');

        expect(buttonDrinkFilter).toBeInTheDocument();
        expect(foodName).toBeNull();
    });
})