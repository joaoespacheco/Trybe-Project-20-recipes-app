import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import getCockTailApi from '../services/CockTailApi';
import getMealApi from '../services/MealApi';

export default function RecomendationCards({ page }) {
  const [recomendation, setRecomendation] = useState();
  console.log(recomendation);

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
    <div data-testid="0-recomendation-card">Isto é um componente de recomendações.</div>
  );
}

RecomendationCards.propTypes = {
  page: string,
}.isRequired;
