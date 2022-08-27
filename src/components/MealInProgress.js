import React, { useState, useEffect } from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function MealInProgress({
  recipe,
  pageId,
  handleClickShare,
  statusMessage,
}) {
  const [buttonFavorite, setButtonFavorite] = useState(false);
  const [saveStorage, setSaveStorage] = useState({
    cocktails: {},
    meals: {},
  });

  const { ingredients, mensures } = recipe;

  const history = useHistory();

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

  const verifyStorage = (currentIngredient) => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: {},
      meals: {},
    };
    const { meals } = inProgressStorage;

    if (saveStorage.meals[pageId]) {
      const status = saveStorage.meals[pageId].some(
        (ingredient) => ingredient === currentIngredient,
      );
      return status;
    }
    if (meals[pageId]) {
      const status = meals[pageId].some(
        (ingredient) => ingredient === currentIngredient,
      );
      return status;
    }
    return false;
  };

  const handleIngredient = (currentIngredient) => {
    const storage = localStorage.getItem('inProgressRecipes');
    const inProgressStorage = storage ? JSON.parse(storage) : {
      cocktails: {},
      meals: { [pageId]: [] },
    };

    const { cocktails, meals } = inProgressStorage;

    if (meals[pageId]) {
      const ingredientStatus = meals[pageId].some(
        (ingredient) => ingredient === currentIngredient,
      );
      if (ingredientStatus) {
        const newIngredients = meals[pageId].filter(
          (ingredient) => ingredient !== currentIngredient,
        );
        const newStorage = {
          cocktails: { ...cocktails },
          meals: {
            ...meals,
            [pageId]: newIngredients,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        setSaveStorage(newStorage);
      }
      if (!ingredientStatus) {
        const newIngredients = [...meals[pageId], currentIngredient];
        const newStorage = {
          cocktails: { ...cocktails },
          meals: {
            ...meals,
            [pageId]: newIngredients,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
        setSaveStorage(newStorage);
      }
    } else if (!meals[pageId]) {
      const newStorage = {
        cocktails: { ...cocktails },
        meals: {
          ...meals,
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
      cocktails: {},
      meals: { [pageId]: [] },
    };
    const { meals } = inProgressStorage;
    if (meals[pageId]) {
      const status = !ingredients.every(
        (ingredient) => meals[pageId].includes(ingredient),
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
            {ingredients.map((ingredient, index) => (
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ ingredient }
                key={ `${index}-ingredient-step` }
              >
                <input
                  data-testid={ `input-foods-${index}` }
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
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/done-recipes') }
              style={ { position: 'fixed', bottom: '0' } }
              disabled={ verifyChecks() }
            >
              Finalizar Receita
            </button>

          </>
        )
      }

    </section>
  );
}

MealInProgress.propTypes = {
  recipe: objectOf(string),
  pageId: string,
  handleClickShare: func,
  statusMessage: bool,
}.isRequired;
