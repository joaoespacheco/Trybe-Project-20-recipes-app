import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MealRecipe from '../components/MealRecipe';
import DrinkRecipe from '../components/DrinkRecipe';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [statusDone, setStatusDone] = useState([true]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = pathname.split('/');
  const progressLocalStorage = localStorage.getItem('inProgressRecipes');
  const inProgressStorage = progressLocalStorage ? JSON.parse(progressLocalStorage) : {
    cocktails: {},
    meals: {},
  };
  const verifyStatus = () => {
    if (path[1] === 'foods') {
      return !!inProgressStorage.meals[path[2]];
    }
    return !!inProgressStorage.cocktails[path[2]];
  };
  const statusInProgress = verifyStatus();
  const changeRecipe = (recipeApi) => {
    const recipeEntries = Object.entries(recipeApi);
    const changedEntries = recipeEntries.filter(([chave, valor]) => (
      (valor !== ' ' && valor !== '' && valor) && [chave, valor]
    ));
    const moreInfos = changedEntries.filter(([chave, valor]) => {
      let validedInfos = [];
      if (!chave.includes('strIngredient') && !chave.includes('strMeasure')) {
        validedInfos = [chave, valor];
      }
      return validedInfos;
    });
    const ingredientsArray = changedEntries
      .filter(([chave]) => chave.includes('strIngredient'));
    const mensureArray = changedEntries
      .filter(([chave]) => chave.includes('strMeasure'));
    const newRecipe = {
      ingredients: [],
      mensures: [],
    };
    const { ingredients, mensures } = newRecipe;
    moreInfos.forEach(([chave, valor]) => { newRecipe[chave] = valor; });
    ingredientsArray.forEach((ingredient) => ingredients.push(ingredient[1]));
    mensureArray.forEach((mensure) => mensures.push(mensure[1]));
    return newRecipe;
  };
  useEffect(() => {
    const getApiRecipe = async () => {
      const recipeResponse = path[1] === 'foods' ? await getMealApi('recipe', path[2])
        : await getCockTailApi('recipe', path[2]);
      const getResponse = path[1] === 'foods' ? recipeResponse.meals
        : recipeResponse.drinks;
      setRecipe(changeRecipe(getResponse[0]));
    };
    getApiRecipe();
  }, []);
  useEffect(() => {
    const handleStatusDone = () => {
      const doneLocalStorage = localStorage.getItem('doneRecipes');
      const doneStorage = doneLocalStorage ? JSON.parse(doneLocalStorage) : [];
      const newStatus = doneStorage.some(({ id }) => (
        id === recipe.idMeal || id === recipe.idDrink
      ));
      setStatusDone(!newStatus);
    };
    handleStatusDone();
  }, [recipe]);
  const handleLocalStorage = () => {
    const currentRecipe = [];
    if (path[1] === 'foods') {
      const newStorage = {
        ...inProgressStorage,
        meals: {
          ...inProgressStorage.meals,
          [recipe.idMeal]: currentRecipe,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
    if (path[1] === 'drinks') {
      const newStorage = {
        ...inProgressStorage,
        cocktails: {
          ...inProgressStorage.cocktails,
          [recipe.idDrink]: currentRecipe,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
    history.push(`${pathname}/in-progress`);
  };
  return (
    <section>
      { recipe.idMeal && <MealRecipe recipe={ recipe } /> }
      { recipe.idDrink && <DrinkRecipe recipe={ recipe } /> }
      {
        statusDone
        && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ () => handleLocalStorage() }
          >
            {statusInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )
      }
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

    </section>
  );
}
