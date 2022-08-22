import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import RecipeContext from './RecipeContext';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

function RecipeProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [statusSearchBar, setStatusSearchBar] = useState(false);

  const getFoodApi = async (radio, search) => {
    const response = await getMealApi(radio, search);
    setCategory(response);
  };

  const getDrinkApi = async (radio, search) => {
    const response = await getCockTailApi(radio, search);
    setCategory(response);
  };

  const handleFoodsAndDriks = (page, radio, search) => {
    if (page === 'foods') {
      getFoodApi(radio, search);
    }
    if (page === 'drinks') {
      getDrinkApi(radio, search);
    }
  };

  useEffect(() => {
    getFoodApi('', 'category');
  }, []);

  return (
    <RecipeContext.Provider
      value={ {
        category,
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
