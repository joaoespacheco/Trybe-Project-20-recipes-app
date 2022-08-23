import React, { useContext } from 'react';
import { string } from 'prop-types';
import RecipeContext from '../context/RecipeContext';

export default function CategoriesButtons({ page }) {
  const { categories, handleFoodsAndDriks, setStatusFilter } = useContext(RecipeContext);
  const maxNumberCategories = 5;
  const availableCategories = categories
    .filter((_category, index) => index < maxNumberCategories);

  const setFilter = (type, endpoint, status) => {
    handleFoodsAndDriks(page, type, endpoint);
    setStatusFilter(status);
  };

  return (
    <div>
      { availableCategories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => setFilter('filter', strCategory, false) }
        >
          { strCategory }
        </button>
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilter('name', '', true) }
      >
        All
      </button>
    </div>
  );
}

CategoriesButtons.propTypes = {
  page: string,
}.isRequired;
