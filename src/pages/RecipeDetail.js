import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getMealApi from '../services/MealApi';
import getCockTailApi from '../services/CockTailApi';

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/');

  useEffect(() => {
    const getApiRecipe = async () => {
      const recipeResponse = path[1] === 'foods' ? await getMealApi('recipe', path[2])
        : await getCockTailApi('recipe', path[2]);
      const getResponse = path[1] === 'foods' ? recipeResponse.meals
        : recipeResponse.drinks;
      setRecipe(getResponse);
    };
    getApiRecipe();
  }, []);
  console.log(recipe);

  return (
    <section>
      <p>Oi, eu sou o RecipeDetail</p>
    </section>
  );
}
