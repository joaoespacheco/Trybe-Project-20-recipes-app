import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import DrinkInProgress from '../components/DrinkInProgress';
import MealInProgress from '../components/MealInProgress';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';
import styles from '../styles/RecipeInProgress.module.css';

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
    const endPoint = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${endPoint}`);
  };

  const handleDoneStorage = () => {
    const storage = localStorage.getItem('doneRecipes');
    const doneRecipesStorage = storage ? JSON.parse(storage) : [];
    const tags = recipe.strTags ? recipe.strTags.split(',') : [];

    if (path[1] === 'foods') {
      const newRecipe = {
        id: recipe.idMeal,
        type: 'food',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: new Date().toLocaleDateString(),
        tags,
      };
      localStorage.setItem(
        'doneRecipes', JSON.stringify([...doneRecipesStorage, newRecipe]),
      );
      history.push('/done-recipes');
    } else {
      const newRecipe = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: new Date().toLocaleDateString(),
        tags: [],
      };
      localStorage.setItem(
        'doneRecipes', JSON.stringify([...doneRecipesStorage, newRecipe]),
      );
      history.push('/done-recipes');
    }
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
    <section
      className={ styles.containerRecipeInProgress }
    >
      {
        recipe.idMeal && (
          <MealInProgress
            recipe={ recipe }
            pageId={ path[2] }
            statusMessage={ statusMessage }
            handleClickShare={ handleClickShare }
            handleDoneStorage={ handleDoneStorage }
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
            handleDoneStorage={ handleDoneStorage }
          />
        )
      }
    </section>
  );
}
