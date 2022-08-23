import React from 'react';
import { string } from 'prop-types';
import CardFood from './CardFood';
import CardDrink from './CardDrink';

export default function Recipes({ page }) {
  return (
    <section>
      {page === 'foods' && <CardFood />}
      {page === 'drinks' && <CardDrink />}
    </section>
  );
}

Recipes.propTypes = {
  page: string,
}.isRequired;
