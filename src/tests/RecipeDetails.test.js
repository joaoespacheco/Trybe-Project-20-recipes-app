import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App';
import mockFoodName from './mocks/mockFoodName';
import mockDrinkFirstLetter from './mocks/mockDrinkFirstLetter';

describe('Verificando a page RecipeDetails', () => {
  it('Verifica se os componentes são renderizados', async () => {
    const { history } = renderWithRouter(<App/>);
    history.push('/foods/53039');

    jest.spyOn(global, 'fetch')
    global.fetch
    .mockReturnValue({
      json: jest.fn().mockResolvedValue(mockDrinkFirstLetter),
    })
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(mockFoodName),
    });

    await waitFor (() => {
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });

    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const instructions = await screen.findByTestId('instructions');
    const recipeVideo = await screen.findByTestId('video');
    const button = await screen.findByTestId('start-recipe-btn');
    const recommendedDrink = await screen.findByTestId('0-recomendation-title');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recipeVideo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(recommendedDrink).toBeInTheDocument();
  });

  it('Verifica se os componentes são renderizados quando a busca for um drink', async () => {
    localStorage.removeItem('doneRecipes');
    localStorage.setItem('doneRecipes', JSON.stringify(mockFoodName.meals));

    const { history } = renderWithRouter(<App/>);
    history.push('/drinks/17219');

    jest.spyOn(global, 'fetch')
    global.fetch
    .mockReturnValue({
      json: jest.fn().mockResolvedValue(mockFoodName),
    })
      .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinkFirstLetter),
    });

    await waitFor (() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });

    const recipeTitle = screen.queryByTestId('recipe-title');
    const recipePhoto = screen.queryByTestId('recipe-photo');
    const recipeCategory = screen.queryByTestId('recipe-category');
    const instructions = screen.queryByTestId('instructions');
    const recipeVideo = screen.queryByTestId('video');
    const recommendedDrink = screen.queryByTestId('0-recomendation-title');

    expect(recipeTitle).toHaveTextContent('Yellow Bird');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recipeVideo).toBeNull();
    expect(recommendedDrink).toBeInTheDocument();
  });

  it('Verifica se o botão de start recipe não é renderizado caso a receita ja tenha sido terminada', async () => {
    
    const { history } = renderWithRouter(<App/>);
    
    localStorage.removeItem('doneRecipes');
    localStorage.setItem('doneRecipes', JSON.stringify(mockDrinkFirstLetter.drinks))
    
    history.push('/drinks/17219');

    jest.spyOn(global, 'fetch')
    global.fetch
    .mockReturnValue({
      json: jest.fn().mockResolvedValue(mockFoodName),
    })
      .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(mockDrinkFirstLetter),
    });

    await waitFor (() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });

    const recipeTitle = screen.queryByTestId('recipe-title');
    const recipePhoto = screen.queryByTestId('recipe-photo');
    const recipeCategory = screen.queryByTestId('recipe-category');
    const instructions = screen.queryByTestId('instructions');
    const recipeVideo = screen.queryByTestId('video');
    const button = screen.queryByTestId('start-recipe-btn');
    const recommendedDrink = screen.queryByTestId('0-recomendation-title');

    expect(recipeTitle).toHaveTextContent('Yellow Bird');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recipeVideo).toBeNull();
    expect(button).toBeNull();
    expect(recommendedDrink).toBeInTheDocument();
  });
});
//   // it('', () => {

//   // });
// });
