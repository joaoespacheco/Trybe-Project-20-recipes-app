import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App';
import mockFoodName from './mocks/mockFoodName';
import mockDrinkFirstLetter from './mocks/mockDrinkFirstLetter';

jest.mock('clipboard-copy');

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
    expect(button).toBeInTheDocument()
    expect(recommendedDrink).toBeInTheDocument();
  });

    it('Verificando os botões de favorito no "/foods"', async () => {
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
    
    const buttonShare = screen.getByTestId('share-btn');
    const buttonFavorite = screen.getByTestId('favorite-btn');

    expect(buttonShare).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();

    userEvent.click(buttonFavorite);

    expect(buttonFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('Verificando os botões de favorito no "/foods"', async () => {
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

    const buttonStartRecipe = screen.getByTestId('start-recipe-btn');

    expect(buttonStartRecipe).toBeInTheDocument();

    jest.spyOn(global, 'fetch')
    global.fetch
    .mockReturnValue({
      json: jest.fn().mockResolvedValue(mockFoodName),
    });

    userEvent.click(buttonStartRecipe);

    expect(history.location.pathname).toBe('/foods/53039/in-progress');
  });

  it('Verificando os botões de favorito no "/drinks', async () => {
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
    
    const buttonShare = screen.getByTestId('share-btn');
    const buttonFavorite = screen.getByTestId('favorite-btn');
  
    expect(buttonShare).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
  
    userEvent.click(buttonFavorite);
    userEvent.click(buttonShare);
  
    expect(buttonFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  
  });

  it('Verificando os botões de favorito para remover dos favoritos no "/drinks', async () => {
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: '17219',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Yellow Bird',
      image: 'https://www.thecocktaildb.com/images/media/drink/2t9r6w1504374811.jpg',
    }]))

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
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17219');
    });
    
    const buttonFavorite = screen.getByTestId('favorite-btn');
    
    expect(buttonFavorite).toBeInTheDocument();
    
    userEvent.click(buttonFavorite);

    const newButtonFavorite = screen.getByTestId('favorite-btn');
    expect(newButtonFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

});

