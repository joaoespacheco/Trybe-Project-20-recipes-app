import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import styles from '../styles/Cards.module.css';

export default function CardFood() {
  const { recipesList } = useContext(RecipeContext);
  const maxCardNumbers = 12;
  const recipes = recipesList.filter((_recipe, index) => index < maxCardNumbers);
  return (
    <div
      className={ styles.containerCards }
    >
      {recipes.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Link
          to={ `/foods/${idMeal}` }
          key={ `${index} - ${idMeal}` }
        >
          <h3 data-testid={ `${index}-card-name` }>{ strMeal }</h3>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
        </Link>
      ))}
    </div>
  );
}
