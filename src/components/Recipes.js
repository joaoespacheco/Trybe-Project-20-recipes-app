import React from 'react';
import { string } from 'prop-types';
import CardFood from './CardFood';
import CardDrink from './CardDrink';
import styles from '../styles/Cards.module.css';

export default function Recipes({ page }) {
  return (
    <section
      className={ styles.containerRecipes }
    >
      {page === 'foods' && <CardFood />}
      {page === 'drinks' && <CardDrink />}
    </section>
  );
}

Recipes.propTypes = {
  page: string,
}.isRequired;
