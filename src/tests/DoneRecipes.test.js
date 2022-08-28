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

    it('Verificando se o botão de compartilhar tem o comportamento esperado', async () => {
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

    it('Verificando se os filtros tem o comportamento esperado', async () => {
        localStorage.setItem('doneRecipes', JSON.stringify(mockLocalStorageDoneRecipe));
        const { history} = renderWithRouter(<App />);
        history.push("/done-recipes");

        const foodName = await screen.findByTestId('0-horizontal-name');
        const buttonDrinkFilter = screen.getByTestId('filter-by-drink-btn');

        expect(foodName).toHaveTextContent("Spicy Arrabiata Penne");

        userEvent.click(buttonDrinkFilter);

        const drinkName = screen.getByTestId('0-horizontal-name');
        expect(drinkName).toHaveTextContent('Margarita');

        const buttonAllFilter = screen.getByTestId('filter-by-all-btn');
        userEvent.click(buttonAllFilter);

        const newFoodName = screen.getByTestId('0-horizontal-name');
        expect(drinkName).toHaveTextContent('Spicy Arrabiata Penne');

        const buttonFoodFilter = screen.getByTestId('filter-by-food-btn');
        userEvent.click(buttonFoodFilter);
        
        const newDrinkName = screen.queryByText(/Margarita/i);
        expect(newDrinkName).toBeNull();
    });

    it('Verificando se o site não quebra com a falta de algo no localStorage', async () => {
        localStorage.removeItem('doneRecipes');

        const { history} = renderWithRouter(<App />);
        history.push("/done-recipes");

        const foodName = screen.queryByTestId('0-horizontal-name');
        const buttonDrinkFilter = screen.getByTestId('filter-by-drink-btn');

        expect(buttonDrinkFilter).toBeInTheDocument();
        expect(foodName).toBeNull();
    });
})