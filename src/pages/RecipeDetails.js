import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MealRecipe from '../components/MealRecipe';
import DrinkRecipe from '../components/DrinkRecipe';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState([]);
  const [statusDone, setStatusDone] = useState(false);
  const [statusInProgress, setStatusInProgress] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  const path = pathname.split('/');

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
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && (
      inProgressRecipes.meals[path[2]] || inProgressRecipes.cocktails[path[2]])) {
      setStatusDone(false);
      setStatusInProgress(true);
      console.log('entrou no primeiro if');
    } else if (recipesDone) {
      const statusRecipe = recipesDone.some(({ id }) => (
        id === recipe.idMeal || id === recipe.idDrink
      ));
      setStatusDone(!statusRecipe);
      setStatusInProgress(false);
    } else {
      setStatusDone(true);
      setStatusInProgress(false);
    }
  }, [recipe]);

  const handleLocalStorage = () => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: {},
      meals: {},
    };
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
        cockTails: {
          ...inProgressStorage.cockTails,
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
            Start Recipe
          </button>
        )
      }
      {
        statusInProgress
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0' } }
          onClick={ () => history.push(`${pathname}/in-progress`) }
        >
          Continue Recipe
        </button>
      )
      }
    </section>
  );
}
