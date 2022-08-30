import React, { useState } from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import RecomendationCards from './RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from '../styles/RecipeDetail.module.css';

export default function DrinkRecipe({ recipe, handleClickShare, statusMessage, pageId }) {
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
    const favoriteStatus = favoriteStorage.some(({ id }) => pageId === id);
    if (favoriteStatus) {
      const newFavorites = favoriteStorage.filter(({ id }) => pageId !== id);
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
      .some(({ id }) => pageId === id) ? blackHeartIcon : whiteHeartIcon);
  };
  return (
    <section
      className={ styles.containerRecipeMeal }
    >
      {
        !!recipe && (
          <>
            <header>
              <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
              <div>
                {statusMessage
                 && (
                   <span>
                     Link copied!
                   </span>
                 )}
                <button
                  type="button"
                  onClick={ handleClickShare }
                  style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                  data-testid="share-btn"
                >
                  <img
                    src={ shareIcon }
                    alt="Ícone de compartilhamento"
                    className={ styles.icons }
                  />
                </button>
                <button
                  type="button"
                  onClick={ handleFavorite }
                  style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                >
                  <img
                    src={ verifyFavoriteSave() }
                    alt="Ícone de favoritar"
                    data-testid="favorite-btn"
                    className={ styles.icons }
                  />
                </button>
              </div>
            </header>

            <img
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />

            <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>

            <div
              className={ styles.ingredientList }
            >
              <p>Lista de Ingredientes:</p>
              <br />
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
            </div>

            <div
              className={ styles.instructions }
            >
              <p>Modo de preparo:</p>
              <p data-testid="instructions">{ recipe.strInstructions }</p>
            </div>
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
