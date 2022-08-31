import React from 'react';
import { func } from 'prop-types';
import styles from '../styles/DoneRecipes.module.css';

export default function FilterButtons({ filterRecipes }) {
  return (
    <div
      className={ styles.filterButtons }
    >
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterRecipes('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drink') }
      >
        Drinks
      </button>
    </div>

  );
}

FilterButtons.propTypes = {
  filterRecipes: func,
}.isRequired;
