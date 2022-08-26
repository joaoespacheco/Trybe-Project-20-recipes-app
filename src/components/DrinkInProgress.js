import React, { useState } from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkInProgress({
  recipe,
  pageId,
  handleClickShare,
  statusMessage,
}) {
  const [buttonFavorite, setButtonFavorite] = useState(false);
  // const [saveStorage, setSaveStorage] = useState({});
  const { ingredients, mensures } = recipe;

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

  // const verifyStorage = () => {
  //   const storage = localStorage.getItem('inProgressRecipes');
  //   if (saveStorage.idMeal || saveStorage.idDrink) {
  //     console.log('');
  //   }
  // };

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
              onClick={ handleFavorite }
              style={ { background: 'none', border: 'none', cursor: 'pointer' } }
            >
              <img
                src={ verifyFavoriteSave() }
                alt="Ícone de favoritar"
                data-testid="favorite-btn"
              />
            </button>

            <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>

            <div>
              {ingredients.map((ingredient, index) => (
                <label
                  htmlFor={ ingredient }
                  data-testid="ingredient-step"
                  key={ `${index}-ingredient-step` }
                >
                  <input
                    data-testid={ `${index}-ingredient-step` }
                    id={ ingredient }
                    type="checkbox"
                    // checked={  }
                  />
                  { `${ingredient} - ${mensures[index]}` }
                </label>
              ))}
            </div>

            <p data-testid="instructions">{ recipe.strInstructions }</p>

            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </>
        )
      }

    </section>
  );
}

DrinkInProgress.propTypes = {
  recipe: objectOf(string),
  pageId: string,
  handleClickShare: func,
  statusMessage: bool,
}.isRequired;
