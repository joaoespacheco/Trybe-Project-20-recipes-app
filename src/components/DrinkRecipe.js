import React from 'react';
import { objectOf, string } from 'prop-types';
import RecomendationCards from './RecomendationCard';

export default function DrinkRecipe({ recipe }) {
  const { ingredients, mensures } = recipe;
  return (
    <section>
      {
        !!recipe && (
          <>
            <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>

            <img
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              style={ { width: '150px', padding: '0 10px' } }
            />

            <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>

            <ul>
              {ingredients.map((ingredient, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ `${index}-ingredient-name-and-measure` }
                >
                  { `${ingredient} - ${mensures[index]}` }
                </li>
              ))}
            </ul>

            <p data-testid="instructions">{ recipe.strInstructions }</p>

          </>
        )
      }
      <RecomendationCards />
    </section>
  );
}

DrinkRecipe.propTypes = {
  recipe: objectOf(string),
}.isRequired;
