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
              style={ { width: '180px', padding: '0 10px' } }
              alt={ strDrink }
            />
            <h3>{ strAlcoholic }</h3>
            <h3 data-testid={ `${index}-recomendation-title` }>{ strDrink }</h3>
          </div>
        ))
      ) : (
        recomendation.map(({ strMealThumb, strMeal, idMeal, strCategory }, index) => (
          <div data-testid={ `${index}-recomendation-card` } key={ idMeal }>
            <img
              src={ strMealThumb }
              style={ { width: '175px', padding: '0 10px' } }
              alt={ strMeal }
            />
            <h3>{ strCategory }</h3>
            <h3 data-testid={ `${index}-recomendation-title` }>{ strMeal }</h3>
          </div>
        ))
      )}
    </section>
  );
}

RecomendationCards.propTypes = {
  page: string,
}.isRequired;
