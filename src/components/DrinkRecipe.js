import React from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import RecomendationCards from './RecomendationCard';
import shareIcon from '../images/shareIcon.svg';

export default function DrinkRecipe({ recipe, handleClickShare, statusMessage }) {
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

            <button
              type="button"
              onClick={ handleClickShare }
              style={ { background: 'none', border: 'none', cursor: 'pointer' } }
              data-testid="share-btn"
            >
              <img
                src={ shareIcon }
                alt="Ícone de compartilhamento"
              />
            </button>
            {statusMessage
      && (
        <span>
          Link copied!
        </span>
      )}
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>

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
      <RecomendationCards page="drinks" />
    </section>
  );
}

DrinkRecipe.propTypes = {
  recipe: objectOf(string),
  handleClickShare: func,
  statusMessage: bool,
}.isRequired;
