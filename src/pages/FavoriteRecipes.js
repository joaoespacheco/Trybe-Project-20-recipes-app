import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [FavoriteFoods, setFavoriteFoods] = useState([]);
  const [elementCopied, setElementCopied] = useState('');

  const handleClickShare = (type, id) => {
    setElementCopied(id);
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  const handleFavorite = (currentId) => {
    const storage = localStorage.getItem('favoriteRecipes');
    const favoriteStorage = storage ? JSON.parse(storage) : [];
    const newFavorites = favoriteStorage.filter(({ id }) => id !== currentId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteFoods(newFavorites);
  };

  useEffect(() => {
    const getLocalStorage = () => {
      const storage = localStorage.getItem('favoriteRecipes');
      const favoriteRecipes = storage ? JSON.parse(storage) : [];
      setFavoriteFoods(favoriteRecipes);
    };
    getLocalStorage();
  }, []);

  return (
    <>
      <Header statusButton={ false } pageTitle="Favorite Recipes" />
      <div>
        <button
          type="button"
          style={ { cursor: 'pointer' } }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          style={ { cursor: 'pointer' } }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          style={ { cursor: 'pointer' } }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {FavoriteFoods && (
        <section>
          {
            FavoriteFoods.map(
              ({ id, image, name, type, category, alcoholicOrNot }, index) => (
                <div key={ `${id}-${index}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ image }
                    alt={ `${name}` }
                    style={ { width: '250px' } }
                  />
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {name}
                  </h3>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {type === 'food' ? category : alcoholicOrNot}
                  </p>
                  <button
                    type="button"
                    onClick={ () => handleClickShare(type, id) }
                    style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                    data-testid={ `${index}-horizontal-share-btn` }
                  >
                    <img
                      src={ shareIcon }
                      alt="Ícone de compartilhamento"
                    />
                  </button>
                  {elementCopied === id
                  && (
                    <span>
                      Link copied!
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={ () => handleFavorite(id) }
                    style={ { background: 'none', border: 'none', cursor: 'pointer' } }
                  >
                    <img
                      src={ blackHeartIcon }
                      alt="Ícone de favoritar"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              ),
            )
          }
        </section>
      )}
      <footer
        style={ { position: 'fixed', bottom: '0px', display: 'flex' } }
        data-testid="footer"
      >
        <button
          type="button"
          style={ { background: 'none', border: 'none', cursor: 'pointer' } }
        >
          <img
            src={ mealIcon }
            alt="Ícone de food"
            data-testid="food-bottom-btn"
          />
        </button>
        <button
          type="button"
          style={ { background: 'none', border: 'none', cursor: 'pointer' } }
        >
          <img
            src={ drinkIcon }
            alt="Ícone de drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </footer>
    </>
  );
}
