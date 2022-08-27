import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function CardDrink() {
  const { recipesList } = useContext(RecipeContext);
  const maxCardNumbers = 12;
  const recipes = recipesList.filter((_recipe, index) => index < maxCardNumbers);
  return (
    <div style={ { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } }>
      {recipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        <Link
          to={ `/drinks/${idDrink}` }
          key={ `${index} - ${idDrink}` }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ strDrinkThumb }
              style={ { width: '150px', padding: '0 10px' } }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
