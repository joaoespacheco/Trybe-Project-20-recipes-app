import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import DrinkInProgress from '../components/DrinkInProgress';
import FoodInProgress from '../components/FoodInProgress';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [statusMessage, setStatusMessage] = useState(false);

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

  const handleClickShare = () => {
    setStatusMessage(true);
    copy(`http://localhost:3000${pathname}`);
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

  return (
    <section>
      {
        recipe.idMeal && (
          <FoodInProgress
            recipe={ recipe }
            pageId={ path[2] }
            statusMessage={ statusMessage }
            handleClickShare={ handleClickShare }
          />
        )
      }
      {
        recipe.idDrink && (
          <DrinkInProgress
            recipe={ recipe }
            pageId={ path[2] }
            statusMessage={ statusMessage }
            handleClickShare={ handleClickShare }
          />
        )
      }
    </section>
  );
}
