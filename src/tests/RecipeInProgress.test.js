import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App';
import MockRecipeFood from './mocks/MockRecipeFood';
import MockRecipeDrink from './mocks/MockRecipeDrink';

jest.mock('clipboard-copy');

describe('Verificando a page RecipeDetails', () => {
  
  it('Verifica se os componentes são renderizados em "drinks/:id/in-progress"', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeDrink),
    }));

    localStorage.clear();
    const { history } = renderWithRouter(<App />);

    history.push('/drinks/17219/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const recipeTitle = screen.getByTestId('recipe-title');
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const ingredientList = screen.getAllByTestId('ingredient-step');
    const Finishbutton = screen.getByTestId('finish-recipe-btn');
    const sharebutton = screen.getByTestId('share-btn');
    const favoritebutton = screen.getByTestId('favorite-btn');


    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredientList).toHaveLength(4);
    expect(Finishbutton).toBeInTheDocument();
    expect(sharebutton).toBeInTheDocument();
    expect(favoritebutton).toBeInTheDocument();

  })

  it('Verifica se os componentes são renderizados em "foods/:id/in-progress"', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeFood),
    }));

    localStorage.clear();
    const { history } = renderWithRouter(<App />);

    history.push('/foods/53039/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const recipeTitle = screen.getByTestId('recipe-title');
    const recipePhoto = screen.getByTestId('recipe-photo');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const ingredientList = screen.getAllByTestId('ingredient-step');
    const Finishbutton = screen.getByTestId('finish-recipe-btn');
    const sharebutton = screen.getByTestId('share-btn');
    const favoritebutton = screen.getByTestId('favorite-btn');


    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredientList).toHaveLength(17);
    expect(Finishbutton).toBeInTheDocument();
    expect(sharebutton).toBeInTheDocument();
    expect(favoritebutton).toBeInTheDocument();

  })

  it('Verifica as funcionalidades dos elementosem "drinks/:id/in-progress"', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeDrink),
    }));

    localStorage.clear();
    const { history } = renderWithRouter(<App />);

    history.push('/drinks/17219/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const ingredientLabel = screen.getAllByTestId('ingredient-step');
    const Finishbutton = screen.getByTestId('finish-recipe-btn');
    const sharebutton = screen.getByTestId('share-btn');
    const favoritebutton = screen.getByTestId('favorite-btn');

    userEvent.click(favoritebutton);
    expect(favoritebutton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(sharebutton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(ingredientLabel[1])

    expect(screen.getByTestId('input-drinks-0').checked).not.toBeTruthy();
    expect(screen.getByTestId('input-drinks-1').checked).toBeTruthy();

    userEvent.click(Finishbutton)
    expect(history.location.pathname).toBe('/done-recipes');
  })

  it('Verifica as funcionalidades dos elementos em "foods/:id/in-progress"', async () => {
    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeFood),
    }));

    localStorage.clear();
    const { history } = renderWithRouter(<App />);

    history.push('/foods/53039/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const ingredientLabel = screen.getAllByTestId('ingredient-step');
    const finishButton = screen.getByTestId('finish-recipe-btn');
    const sharebutton = screen.getByTestId('share-btn');
    const favoritebutton = screen.getByTestId('favorite-btn');

    userEvent.click(favoritebutton);
    expect(favoritebutton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(sharebutton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(ingredientLabel[5])

    expect(screen.getByTestId('input-foods-0').checked).not.toBeTruthy();
    expect(screen.getByTestId('input-foods-5').checked).toBeTruthy();

    userEvent.click(finishButton)
    expect(history.location.pathname).toBe('/done-recipes');
  })
});