import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function CardFood() {
  const { recipesList } = useContext(RecipeContext);
  const maxCardNumbers = 12;
  const recipes = recipesList.filter((_recipe, index) => index < maxCardNumbers);
  return (
    <div style={ { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } }>
      {recipes.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Link
          to={ `/foods/${idMeal}` }
          key={ idMeal }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ strMealThumb }
              style={ { width: '150px', padding: '0 10px' } }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
