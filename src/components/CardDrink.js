import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function CardDrink() {
  const { recipesList } = useContext(RecipeContext);
  const maxCardNumbers = 12;
  const recipes = recipesList.filter((_recipe, index) => index < maxCardNumbers);
  return (
    <div>
      {recipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        <Link
          to={ `/drinks/${idDrink}}` }
          data-testid={ `${index}-recipe-card` }
          key={ idDrink }
        >
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
        </Link>

      ))}
    </div>
  );
}
