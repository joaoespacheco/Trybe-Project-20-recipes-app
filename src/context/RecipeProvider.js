import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import RecipeContext from './RecipeContext';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

function RecipeProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [statusSearchBar, setStatusSearchBar] = useState(false);

  const handleCategoryFood = async () => {
    const response = await getMealApi('category');
    setCategory(response);
  };

  const handleCategoryDrink = async () => {
    const response = await getCockTailApi('category');
    setCategory(response);
  };

  useEffect(() => {
    handleCategoryFood();
  }, []);

  return (
    <RecipeContext.Provider
      value={ {
        category,
        handleCategoryFood,
        handleCategoryDrink,
        statusSearchBar,
        setStatusSearchBar,
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
