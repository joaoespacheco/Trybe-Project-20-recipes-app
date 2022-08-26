import React, { useState } from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import RecomendationCards from './RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function MealRecipe({ recipe, handleClickShare, statusMessage, pageId }) {
  const [buttonFavorite, setButtonFavorite] = useState(false);
  const { ingredients, mensures } = recipe;
  const idVideo = recipe.strYoutube.split('=')[1];

  const handleFavorite = () => {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe;
    const storage = localStorage.getItem('favoriteRecipes');
    const favoriteStorage = storage ? JSON.parse(storage) : [];
    const favoriteStatus = favoriteStorage.some(({ id }) => pageId === id);
    if (favoriteStatus) {
      const newFavorites = favoriteStorage.filter(({ id }) => pageId !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const currentFavorite = {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...favoriteStorage, currentFavorite],
      ));
    }
    setButtonFavorite(!buttonFavorite);
  };

  const verifyFavoriteSave = () => {
    const storage = localStorage.getItem('favoriteRecipes');
    const favoriteStorage = storage ? JSON.parse(storage) : [];
    return (favoriteStorage
      .some(({ id }) => pageId === id) ? blackHeartIcon : whiteHeartIcon);
  };

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
              onClick={ handleFavorite }
              style={ { background: 'none', border: 'none', cursor: 'pointer' } }
            >
              <img
                src={ verifyFavoriteSave() }
                alt="Ícone de favoritar"
                data-testid="favorite-btn"
              />
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