/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from '../styles/RecipeInProgress.module.css';

export default function DrinkInProgress({
  recipe,
  pageId,
  handleClickShare,
  statusMessage,
  handleDoneStorage,
}) {
  const [buttonFavorite, setButtonFavorite] = useState(false);
  const [saveStorage, setSaveStorage] = useState({
    cocktails: {},
    meals: {},
  });
  const { ingredients, mensures } = recipe;

  const handleFavorite = () => {
    const { idDrink, strCategory, strDrink, strDrinkThumb, strAlcoholic } = recipe;
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

  const verifyStorage = (currentIngredient) => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: {},
      meals: {},
    };
    const { cocktails } = inProgressStorage;

    if (saveStorage.cocktails[pageId]) {
      const status = saveStorage.cocktails[pageId].some(
        (ingredient) => ingredient === currentIngredient,
      );
      return status;
    }
    if (cocktails[pageId]) {
      const status = cocktails[pageId].some(
        (ingredient) => ingredient === currentIngredient,
      );
      return status;
    }
    return false;
  };

  const handleIngredient = (currentIngredient) => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: { [pageId]: [] },
      meals: {},
    };
    const { cocktails, meals } = inProgressStorage;

    if (cocktails[pageId]) {
      const ingredientStatus = cocktails[pageId].some(
        (ingredient) => ingredient === currentIngredient,
      );
      if (ingredientStatus) {
        const newIngredients = cocktails[pageId].filter(
          (ingredient) => ingredient !== currentIngredient,
        );
        const newStorage = {
          meals: { ...meals },
          cocktails: {
            ...cocktails,
            [pageId]: newIngredients,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        setSaveStorage(newStorage);
      }
      if (!ingredientStatus) {
        const newIngredients = [...cocktails[pageId], currentIngredient];
        const newStorage = {
          meals: { ...meals },
          cocktails: {
            ...cocktails,
            [pageId]: newIngredients,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        setSaveStorage(newStorage);
      }
    } else if (!cocktails[pageId]) {
      const newStorage = {
        meals: { ...meals },
        cocktails: {
          ...cocktails,
          [pageId]: [currentIngredient],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
      setSaveStorage(newStorage);
    }
  };

  const verifyChecks = () => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: { [pageId]: [] },
      meals: { },
    };
    const { cocktails } = inProgressStorage;
    if (cocktails[pageId]) {
      const status = !ingredients.every(
        (ingredient) => cocktails[pageId].includes(ingredient),
      );
      return status;
    }
    return true;
  };

  useEffect(() => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: {},
      meals: {},
    };
    setSaveStorage(inProgressStorage);
  }, []);

  return (
    <section
      className={ styles.containerMealInProgress }
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
              {ingredients.map((ingredient, index) => (
                <label
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ ingredient }
                  key={ `${index}-ingredient-step` }
                >
                  <input
                    data-testid={ `input-drinks-${index}` }
                    id={ ingredient }
                    type="checkbox"
                    checked={ verifyStorage(ingredient) }
                    onChange={ () => handleIngredient(ingredient) }
                  />
                  <span
                    style={
                      { textDecoration: (
                        verifyStorage(ingredient) ? 'line-through' : 'none'
                      ) }
                    }
                  >
                    { `${ingredient} - ${mensures[index] ? (
                      mensures[index]
                    ) : (
                      'Unmeasured'
                    )}` }
                  </span>
                </label>
              ))}
            </div>

            <div
              className={ styles.instructions }
            >
              <p>Modo de preparo:</p>
              <p data-testid="instructions">{ recipe.strInstructions }</p>
            </div>

            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleDoneStorage }
              disabled={ verifyChecks() }
              className={ styles.buttonStart }
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
