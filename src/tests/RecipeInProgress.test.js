import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App';
import MockRecipeFood from './mocks/MockRecipeFood';
import MockRecipeDrink from './mocks/MockRecipeDrink';

jest.mock('clipboard-copy');

describe('Verificando a page RecipeInProgress', () => {
  
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
    const ingredientList = screen.getAllByTestId(/ingredient-step/i);
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
    const ingredientList = screen.getAllByTestId(/ingredient-step/i);
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

    const ingredientList = screen.getAllByTestId(/ingredient-step/i);
    const finishButton = screen.getByTestId('finish-recipe-btn');
    const sharebutton = screen.getByTestId('share-btn');
    const favoritebutton = screen.getByTestId('favorite-btn');

    userEvent.click(favoritebutton);
    expect(favoritebutton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(sharebutton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(ingredientList[1])

    expect(screen.getByTestId('input-drinks-0').checked).not.toBeTruthy();
    expect(screen.getByTestId('input-drinks-1').checked).toBeTruthy();


    userEvent.click(ingredientList[0])
    userEvent.click(ingredientList[2])
    userEvent.click(ingredientList[3])

    userEvent.click(finishButton)
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

    const ingredientList = screen.getAllByTestId(/ingredient-step/i);
    const finishButton = screen.getByTestId('finish-recipe-btn');
    const sharebutton = screen.getByTestId('share-btn');
    const favoritebutton = screen.getByTestId('favorite-btn');

    userEvent.click(favoritebutton);
    expect(favoritebutton).toHaveAttribute('src', 'blackHeartIcon.svg');

    userEvent.click(sharebutton);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();

    userEvent.click(ingredientList[5])

    expect(screen.getByTestId('input-foods-0').checked).not.toBeTruthy();
    expect(screen.getByTestId('input-foods-5').checked).toBeTruthy();

    userEvent.click(ingredientList[0])
    userEvent.click(ingredientList[1])
    userEvent.click(ingredientList[2])
    userEvent.click(ingredientList[3])
    userEvent.click(ingredientList[4])
    userEvent.click(ingredientList[6])
    userEvent.click(ingredientList[8])
    userEvent.click(ingredientList[9])
    userEvent.click(ingredientList[10])
    userEvent.click(ingredientList[11])
    userEvent.click(ingredientList[12])
    userEvent.click(ingredientList[13])
    userEvent.click(ingredientList[14])
    userEvent.click(ingredientList[15])
    userEvent.click(ingredientList[16])


    userEvent.click(finishButton)
    expect(history.location.pathname).toBe('/done-recipes');
  })

  it('Verifica as funcionalidades dos elementos em "foods/:id/in-progress" se renderiza com opções marcadas', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '53039',
      type: 'food',
      nationality: 'Portuguese',
      category: 'Chicken',
      alcoholicOrNot: '',
      name: 'Piri-piri chicken and slaw',
      image: 'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg',
    }]))
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: { '53039': ['Chicken', 'Red Chilli'] },
    }))

    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeFood),
    }));

    const { history } = renderWithRouter(<App />);

    history.push('/foods/53039/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const ingredientList = screen.getAllByTestId(/ingredient-step/i);

    userEvent.click(ingredientList[1])

    expect(screen.getByTestId('input-foods-0').checked).toBeTruthy();
    expect(screen.getByTestId('input-foods-1').checked).not.toBeTruthy();

    const favoritebutton = screen.getByTestId('favorite-btn');

    userEvent.click(favoritebutton);
    expect(favoritebutton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  })

  it('Verifica as funcionalidades dos elementos em "foods/:id/in-progress" se mantem o mesmo desempenho com outras receitas salvas', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: { '23476': ['Chicken', 'Red Chilli'] },
    }))

    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeFood),
    }));

    const { history } = renderWithRouter(<App />);

    history.push('/foods/53039/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const ingredientList = screen.getAllByTestId(/ingredient-step/i);

    userEvent.click(ingredientList[1])

    expect(screen.getByTestId('input-foods-0').checked).not.toBeTruthy();
    expect(screen.getByTestId('input-foods-1').checked).toBeTruthy();
  })

  it('Verifica as funcionalidades dos elementos em "drinks/:id/in-progress" se renderiza com opções marcadas', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '17219',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Yellow Bird',
      image: 'https://www.thecocktaildb.com/images/media/drink/2t9r6w1504374811.jpg',
    }]))
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { '17219': ['White Rum', 'Galliano'] },
      meals: {},
    }))

    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeDrink),
    }));

    const { history } = renderWithRouter(<App />);

    history.push('/drinks/17219/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const ingredientList = screen.getAllByTestId(/ingredient-step/i);

    userEvent.click(ingredientList[1])

    expect(screen.getByTestId('input-drinks-0').checked).toBeTruthy();
    expect(screen.getByTestId('input-drinks-1').checked).not.toBeTruthy();

    const favoritebutton = screen.getByTestId('favorite-btn');

    userEvent.click(favoritebutton);
    expect(favoritebutton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  })

  it('Verifica as funcionalidades dos elementos em "drinks/:id/in-progress" se mantem o mesmo desempenho com outras receitas salvas', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: { '55889': ['White Rum', 'Galliano'] },
      meals: {},
    }))

    fetch = jest.fn(() => ({
      ok: true,
      json: jest.fn(() => MockRecipeDrink),
    }));

    const { history } = renderWithRouter(<App />);

    history.push('/drinks/17219/in-progress');

    await waitFor (() => {
      expect(fetch).toHaveBeenCalled();
    });

    const ingredientList = screen.getAllByTestId(/ingredient-step/i);

    userEvent.click(ingredientList[1])

    expect(screen.getByTestId('input-drinks-0').checked).not.toBeTruthy();
    expect(screen.getByTestId('input-drinks-1').checked).toBeTruthy();
  })
});