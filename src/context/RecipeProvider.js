import React, { useState } from 'react';
import { node } from 'prop-types';
import RecipeContext from './RecipeContext';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

function RecipeProvider({ children }) {
  const [recipesList, setRecipesList] = useState([]);
  const [statusSearchBar, setStatusSearchBar] = useState(false);
  const [categories, setCategories] = useState([]);

  const getFoodApi = async (radio, search) => {
    const { meals, categoryMeals } = await getMealApi(radio, search);
    if (!meals) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipesList(meals);
    setCategories(categoryMeals);
  };

  const getDrinkApi = async (radio, search) => {
    const { drinks, categoryDrinks } = await getCockTailApi(radio, search);
    if (!drinks) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipesList(drinks);
    setCategories(categoryDrinks);
  };

  const handleFoodsAndDriks = (page, radio, search) => {
    if (page === 'foods') {
      getFoodApi(radio, search);
    }
    if (page === 'drinks') {
      getDrinkApi(radio, search);
    }
  };

  return (
    <RecipeContext.Provider
      value={ {
        recipesList,
        categories,
        getFoodApi,
        getDrinkApi,
        statusSearchBar,
        setStatusSearchBar,
        handleFoodsAndDriks,
      } }
    >
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: node,
}.isRequired;

export default RecipeProvider;
