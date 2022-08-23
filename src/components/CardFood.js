import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function CardFood() {
  const { recipesList } = useContext(RecipeContext);
  const maxCardNumbers = 12;
  const recipes = recipesList.filter((_recipe, index) => index < maxCardNumbers);
  return (
    <div>
      {recipes.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Link
          to={ `/foods/${idMeal}}` }
          data-testid={ `${index}-recipe-card` }
          key={ idMeal }
        >
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
        </Link>

      ))}
    </div>
  );
}
