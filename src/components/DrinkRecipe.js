import React, { useState } from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import RecomendationCards from './RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkRecipe({ recipe, handleClickShare, statusMessage }) {
  const [buttonFavorite, setButtonFavorite] = useState(false);
  const { ingredients, mensures } = recipe;

  const handleFavorite = () => {
    const { idDrink,
      strCategory,
      strDrink,
      strDrinkThumb,
      strAlcoholic } = recipe;
    const storage = localStorage.getItem('favoriteRecipes');
    const favoriteStorage = storage ? JSON.parse(storage) : [];
    const favoriteStatus = favoriteStorage.some(({ id }) => recipe.idDrink === id);
    if (favoriteStatus) {
      const newFavorites = favoriteStorage.filter(({ id }) => recipe.idDrink !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const currentFavorite = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
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
      .some(({ id }) => recipe.idDrink === id) ? blackHeartIcon : whiteHeartIcon);
  };
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
              onClick={ handleFavorite }
              style={ { background: 'none', border: 'none', cursor: 'pointer' } }
            >
              <img
                src={ verifyFavoriteSave() }
                alt="Ícone de favoritar"
              />
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
