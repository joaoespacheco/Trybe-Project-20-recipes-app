import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import styles from '../styles/Cards.module.css';

export default function CardDrink() {
  const { recipesList } = useContext(RecipeContext);
  const maxCardNumbers = 12;
  const recipes = recipesList.filter((_recipe, index) => index < maxCardNumbers);
  return (
    <div
      className={ styles.containerCards }
    >
      {recipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        <Link
          to={ `/drinks/${idDrink}` }
          key={ `${index} - ${idDrink}` }
        >
          <h3 data-testid={ `${index}-card-name` }>{ strDrink }</h3>
          <img
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
        </Link>
      ))}
    </div>
  );
}
