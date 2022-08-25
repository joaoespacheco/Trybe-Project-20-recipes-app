import React from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import RecomendationCards from './RecomendationCard';
import shareIcon from '../images/shareIcon.svg';

export default function MealRecipe({ recipe, handleClickShare, statusMessage }) {
  const { ingredients, mensures } = recipe;
  const idVideo = recipe.strYoutube.split('=')[1];

  return (
    <section>
      {
        !!recipe && (
          <>
            <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>

            <img
              data-testid="recipe-photo"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
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

            <p data-testid="recipe-category">{ recipe.strCategory }</p>

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

            <iframe
              data-testid="video"
              width="360"
              height="202"
              src={ `https://www.youtube.com/embed/${idVideo}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write;
              encrypted-media;"
              allowFullScreen
            />

          </>
        )
      }
      <RecomendationCards page="foods" />
    </section>
  );
}

MealRecipe.propTypes = {
  recipe: objectOf(string),
  handleClickShare: func,
  statusMessage: bool,
}.isRequired;
