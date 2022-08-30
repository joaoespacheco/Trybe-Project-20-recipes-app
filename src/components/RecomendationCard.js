import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import getCockTailApi from '../services/CockTailApi';
import getMealApi from '../services/MealApi';
import styles from '../styles/RecomendationCard.module.css';

export default function RecomendationCards({ page }) {
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    const getApiRecipe = async () => {
      const response = page === 'drinks' ? await getMealApi('name', '')
        : await getCockTailApi('name', '');
      const getResponse = page === 'drinks' ? response.meals
        : response.drinks;
      const recomendationsNumber = 6;
      const recomendations = getResponse
        .filter((_recipe, index) => index < recomendationsNumber);
      setRecomendation(recomendations);
    };
    getApiRecipe();
  }, []);

  return (
    <section className={ styles.gallery }>
      { page === 'foods' ? (
        recomendation.map(({ strDrinkThumb, strDrink, idDrink, strAlcoholic }, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ idDrink }
            className={ styles.galleryCell }
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
            <p>{ strAlcoholic }</p>
          </div>
        ))
      ) : (
        recomendation.map(({ strMealThumb, strMeal, idMeal, strCategory }, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ idMeal }
            className={ styles.galleryCell }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
            />
            <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
            <p>{ strCategory }</p>
          </div>
        ))
      )}
    </section>
  );
}

RecomendationCards.propTypes = {
  page: string,
}.isRequired;
