import React from 'react';
import { func } from 'prop-types';

export default function FilterButtons({ filterRecipes }) {
  return (
    <>
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
    </>

  );
}

FilterButtons.propTypes = {
  filterRecipes: func,
}.isRequired;
